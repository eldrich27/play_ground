# <img src="public/worldwise.svg" alt="" width="32" /> WorldWise

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" alt="TypeScript 6" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white" alt="React Router 7" />
  <img src="https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white" alt="Leaflet 1.9" />
  <img src="https://img.shields.io/badge/React_Leaflet-5-199900?logo=leaflet&logoColor=white" alt="React Leaflet 5" />
  <img src="https://img.shields.io/badge/react--datepicker-9-216BA5" alt="react-datepicker 9" />
  <img src="https://img.shields.io/badge/json--server-0.17-000000?logo=json&logoColor=white" alt="json-server 0.17" />
  <img src="https://img.shields.io/badge/CSS_Modules-scoped_styles-1572B6?logo=cssmodules&logoColor=white" alt="CSS Modules" />
  <img src="https://img.shields.io/badge/Oxlint-1-F7B93E?logo=oxc&logoColor=black" alt="Oxlint" />
</p>

WorldWise is a travel tracker. You click anywhere on a world map, WorldWise works out which city you clicked, and you save it with the date you went and a few notes. Your trips show up as pins on the map, in a list of cities, and grouped by country.

This is a learning project. As well as a working app, this README explains the React ideas it is built on: **prop drilling, the Context API, `useReducer`, custom hooks, React Router**, and more.

---

## Contents

- [Features](#features)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Routes](#routes)
- [Concepts used](#concepts-used)
- [External APIs](#external-apis)
- [Limitations and ideas](#limitations-and-ideas)

---

## Features

- **Interactive map:** a Leaflet map with a pin and popup for every saved city.
- **Add a city by clicking the map:** the clicked position is reverse geocoded to fill in the city, country and flag.
- **Use your position:** jumps the map to where you are, using the browser's Geolocation API.
- **Cities and countries views:** a list of your cities, and a list of the unique countries they belong to.
- **City details page:** shows the date and notes for one trip.
- **Delete a city:** a small spinner shows on that row until the delete has finished.
- **Date picker:** a themed `react-datepicker` field with a calendar icon.
- **Login:** a fake user, a protected `/app` area, and a session that survives page reloads.
- **User avatar:** shown in the page nav and on the map, with an initials fallback if the image fails.
- **Loading, error and empty states:** spinners while loading, and clear messages when a location isn't a city or nothing has been added yet.
- **Custom 404 page.**
- **Dark theme everywhere:** built with CSS Modules and shared colour variables.

---

## Getting started

### 1. Prerequisites

- **Node.js 20.19+ or 22.12+**, which Vite 8 needs
- npm, which comes with Node

### 2. Install

```bash
cd worldwise
npm install
```

### 3. Create a `.env` file

Create `worldwise/.env`. It's ignored by git, so every copy of the project needs its own:

```env
# json-server endpoint for your saved cities
VITE_CITIES_URL=http://localhost:3031/cities

# Reverse geocoding API (no "?" at the end, the app adds the query string itself)
VITE_GEOLOCATION_URL=https://api.bigdatacloud.net/data/reverse-geocode-client

# The fake user you can log in as (must be valid JSON on one line)
VITE_FAKE_USER={"id":"user-1","name":"Jack","email":"jack@example.com","password":"qwerty","avatarUrl":"https://i.pravatar.cc/100?u=zz"}
```

> Vite only reads `.env` when it starts. Restart `npm run dev` after changing it.

### 4. Start the fake API

The cities are stored in `src/data/cities.json` and served by json-server. Keep this running in its own terminal:

```bash
npm run server
```

It runs on `http://localhost:3031` and adds a 600 ms delay, so you can see the loading spinners.

### 5. Start the app

In a second terminal:

```bash
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`.

### 6. Log in

The login form is pre-filled with the fake user:

| Email | Password |
|---|---|
| `jack@example.com` | `qwerty` |

---

## Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the Vite dev server with hot reload |
| `npm run server` | Starts json-server on port 3031, watching `src/data/cities.json` |
| `npm run build` | Type checks with `tsc -b`, then builds for production into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Lints the project with Oxlint |

---

## Project structure

```text
worldwise/
├── public/                  # Images, logo, favicon
├── src/
│   ├── components/          # Reusable UI pieces, each with its own .module.css
│   │   ├── Avatar.tsx           # User picture with an initials fallback
│   │   ├── Button.tsx           # Shared button (primary / back / position)
│   │   ├── City.tsx             # Details of one city
│   │   ├── CityItem.tsx         # One row in the city list, with delete
│   │   ├── CityList.tsx
│   │   ├── CountryList.tsx      # Unique countries worked out from the cities
│   │   ├── Form.tsx             # Add a city (reverse geocoding + datepicker)
│   │   ├── Map.tsx              # Leaflet map, markers and click handling
│   │   ├── PageNav.tsx          # Top nav on the public pages
│   │   ├── ProtectedRoutes.tsx  # Sends logged-out users to /login
│   │   ├── Sidebar.tsx          # App sidebar holding the nested routes
│   │   ├── User.tsx             # Logged-in user box on the map
│   │   └── ...                  # Logo, Message, Spinner, AppNav, CountryItem
│   ├── context/
│   │   ├── AuthContext.tsx      # Login state (useReducer + localStorage)
│   │   └── CityContext.tsx      # Cities state and API calls (useReducer)
│   ├── data/cities.json         # json-server "database"
│   ├── hooks/
│   │   ├── useGeolocation.ts    # Browser position on demand
│   │   └── useUrlLocation.ts    # Reads ?lat=&lng= from the URL
│   ├── pages/                   # One component per top-level route
│   ├── types/                   # Cities, Country, User
│   ├── utils/
│   │   ├── convertToEmoji.tsx   # Country code ↔ flag emoji / flag image
│   │   └── formatDate.ts
│   ├── App.tsx                  # Providers and the route tree
│   ├── main.tsx                 # Entry point (StrictMode)
│   └── index.css                # Global styles and colour variables
└── .env                         # Your local settings (not committed)
```

---

## Routes

| Path | Page | Protected |
|---|---|---|
| `/` | Homepage | No |
| `/product` | Product | No |
| `/pricing` | Pricing | No |
| `/login` | Login | No |
| `/app` | App layout. Redirects to `/app/cities` | **Yes** |
| `/app/cities` | List of cities | **Yes** |
| `/app/cities/:id?lat=&lng=` | One city's details | **Yes** |
| `/app/countries` | List of countries | **Yes** |
| `/app/form?lat=&lng=` | Add a city at that position | **Yes** |
| `*` | 404 page | No |

---

## Concepts used

### Components and props

The UI is made of small components that each do one job, such as `CityItem`, `Spinner`, `Message`, `Button` and `Avatar`. Data goes **down** through props:

```tsx
<CityItem key={city.id} city={city} />
```

Reusable components take props to change how they look or behave. `Button` has a `type` prop (`primary`, `back`, `position`), and `Avatar` has `name`, `src` and `size`.

### Prop drilling, and why it became a problem

At first, `App` held the cities in its own state and passed them down through every layer:

```tsx
// Early version: App passes the data down by hand
const [cities, setCities] = useState<Cities[]>([]);
const [isLoading, setIsLoading] = useState(false);

<Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
<Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
```

That's **prop drilling**: passing props through components that don't need them, just so a component further down can get them. It gets worse with every new consumer. `Map`, `City`, `Form` and `CityItem` all need the cities too, and some also need ways to add or delete them.

### Context API

To fix this, the cities moved into a **context**. Any component inside the provider can read them directly, however deep it is:

```tsx
// App.tsx: providers wrap the whole app
<AuthProvider>
  <CitiesProvider>
    <BrowserRouter>...</BrowserRouter>
  </CitiesProvider>
</AuthProvider>
```

```tsx
// Any component, no props needed
const { cities, isLoading, addCity, deleteCity } = useCities();
```

The app has two contexts:

- **`CityContext`** holds `cities` and `isLoading`, plus `addCity` and `deleteCity`, which talk to json-server.
- **`AuthContext`** holds `user` and `isAuthenticated`, plus `login` and `logout`.

Both follow the same pattern:

1. Create the context with `createContext<Values | undefined>(undefined)`.
2. A **provider component** owns the state and passes it through `value`.
3. A **custom hook** (`useCities`, `useAuth`) wraps `useContext`. It throws a clear error if it's used outside the provider, so components never have to deal with `undefined`.

### `useReducer`

Both contexts manage their state with `useReducer` instead of several `useState` calls. All the ways the state can change are collected in one **pure function**:

```ts
type CitiesAction =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: Cities[] }
  | { type: "city/created"; payload: Cities }
  | { type: "city/deleted"; payload: Cities["id"] }
  | { type: "loading/finished" };

function reducer(state: CitiesState, action: CitiesAction): CitiesState {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/created":
      return { ...state, cities: [...state.cities, action.payload] };
    case "city/deleted":
      return { ...state, cities: state.cities.filter((c) => c.id !== action.payload) };
    case "loading/finished":
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
```

Why it helps:

- Values that change together, such as `cities` and `isLoading`, are updated in **one step**.
- Components describe **what happened**, like `dispatch({ type: "city/deleted", payload: id })`. The reducer decides **how the state changes**.
- With a TypeScript union type for the actions, every `dispatch` is checked, and each `case` knows its `payload` type.
- A reducer can't run side effects. API calls stay in the provider's `async` functions, which dispatch actions once they finish.

`AuthContext` also uses the **third argument of `useReducer`**, a lazy initialiser, to restore the saved session before the first render:

```ts
const [state, dispatch] = useReducer(reducer, initialState, loadSession);
```

### Custom hooks

Reusable stateful logic lives in custom hooks:

- **`useGeolocation`** asks the browser for the user's position only when `getPosition()` is called. It returns `{ position, isLoading, error, getPosition }`, and it ignores late results if the component has already unmounted.
- **`useUrlLocation`** reads `lat` and `lng` from the query string with `useSearchParams`.
- **`useCities` / `useAuth`** read the contexts safely, as described above.

### React Router

| Feature | Where it's used |
|---|---|
| `BrowserRouter`, `Routes`, `Route` | The route tree in `App.tsx` |
| **Nested routes + `<Outlet />`** | `/app/*` pages render inside `Sidebar` |
| **Index route + `<Navigate />`** | `/app` redirects to `/app/cities` |
| `NavLink` and its `active` class | Highlighting the current page in the navs |
| `useParams` | `City` reads `:id` from the URL |
| **`useSearchParams`: the URL as state** | `lat` and `lng` live in the query string, so map positions can be shared and survive a reload |
| `useNavigate` | Moving between pages in code: after a map click, after saving, on logout, for back buttons |
| `useLocation` + navigation `state` | The login page sends you back to the page you were trying to open |
| Catch-all route `*` | The 404 page |

### Protected routes

`ProtectedRoutes` wraps the `/app` layout. If you aren't logged in, it returns `<Navigate to="/login" replace state={{ from: location }} />` **before anything renders**, so protected content never flashes on screen. After you log in, `Login` sends you on to `from`.

### Authentication and keeping the session

- `login` checks the email and password against `VITE_FAKE_USER` and **throws** if they don't match. The login form catches the error and shows it.
- The user is saved to `localStorage`, without the password. Typing a URL or refreshing the page reloads the app, and the saved session logs you straight back in.
- `logout` clears the saved session and returns you to `/`.

### Data fetching with `useEffect`

- Cities are fetched once when the app starts, inside `CitiesProvider`.
- An **`AbortController`** cancels the request if the component unmounts. In development, React's **StrictMode** runs effects twice on purpose, and the cancelled first request is ignored.
- Every response is checked with `resp.ok`, so a server error shows up as an error instead of bad data.
- `addCity` and `deleteCity` **throw on failure**. The component that called them decides what to show: the form shows a message, and a city row brings its delete button back.

### Forms

- **Controlled inputs:** every field is backed by state through `value` and `onChange`.
- The form handles submission with **`onSubmit`** on the `<form>`, not a click handler on the button, so pressing Enter works too.
- Small checks run before saving, and errors appear in the form instead of in an `alert()`.
- **Reverse geocoding:** when the form opens with `?lat=&lng=`, it looks up the city and country. A spinner shows while it loads, and an error message appears if you clicked the sea or somewhere without a city.
- **`react-datepicker`** for the date. It defaults to today and is restyled to match the app.

### Maps with Leaflet

- `MapContainer`, `TileLayer`, `Marker` and `Popup` come from `react-leaflet`.
- **`useMap`** is used in a small `ChangeMapCenter` component that moves the map when the selected city changes.
- **`useMapEvents`** is used in `MapClickHandler`, which sends you to the form with the clicked position.
- These hooks only work inside `MapContainer`, which is why they live in tiny components that render nothing.

### Styling with CSS Modules

- Every component has its own `*.module.css` file, so class names never clash.
- `:global(...)` is used to style classes that come from libraries, such as React Router's `.active`, react-datepicker's calendar and Leaflet's popups.
- Shared colour variables in `index.css` (`--color-brand--1`, `--color-dark--2`, ...) keep the theme consistent.
- `html { font-size: 62.5% }` makes `1rem = 10px`, which makes sizes easy to work out.

### TypeScript patterns

- **Union types** for reducer actions.
- **Utility types:** `Omit<Cities, "id">` for a new city whose id the server assigns, and `Omit<User, "password">` for the saved session user.
- Typed contexts, hook return values and event handlers (`MouseEvent`, form submit events).

### Flag emojis on Windows

Windows doesn't draw flag emojis; it shows two letters instead. `convertToEmoji2` turns a country code into a flag emoji for storage, and `convertToEmoji` turns that emoji back into a country code to show a flag **image** from flagcdn.com.

---

## External APIs

| Service | Used for |
|---|---|
| [BigDataCloud reverse geocoding](https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api) | Turning a clicked position into a city, country and country code (free, no API key) |
| [OpenStreetMap](https://www.openstreetmap.org/copyright) tiles | Map background |
| [flagcdn.com](https://flagcdn.com) | Flag images |
| [pravatar.cc](https://pravatar.cc) | The fake user's avatar |
| Browser Geolocation API | "Use your position" |

---

## Limitations and ideas

- **The login is fake.** The user and password come from `.env`, which Vite builds into the browser code. That's fine for learning, but never do it in a real app; authentication belongs on a server.
- **json-server is a local stand-in for a real backend.** Your data only exists in `src/data/cities.json` on your machine.
- Ideas for later: editing a city, a marker for the selected city, `useCallback` / `useMemo` for the context functions, and tests.
