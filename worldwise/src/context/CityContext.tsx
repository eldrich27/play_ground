import { useReducer, useEffect, createContext, useContext, type ReactNode } from "react"

import type { Cities } from "../types/Cities"

interface CityContextValues {
  cities: Cities[]
  isLoading: boolean
  addCity: (newCity: Omit<Cities, "id">) => Promise<void>
  deleteCity: (id: Cities["id"]) => Promise<void>
}

const CityContext = createContext<CityContextValues | undefined>(undefined)

const citiesUrl = import.meta.env.VITE_CITIES_URL

interface CitiesState {
  cities: Cities[]
  isLoading: boolean
}

type CitiesAction =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: Cities[] }
  | { type: "city/created"; payload: Cities }
  | { type: "city/deleted"; payload: Cities["id"] }
  | { type: "loading/finished" }

const initialState: CitiesState = {
  cities: [],
  isLoading: false,
}

function reducer(state: CitiesState, action: CitiesAction): CitiesState {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true }
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload }
    case "city/created":
      return { ...state, cities: [...state.cities, action.payload] }
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      }
    case "loading/finished":
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export function CitiesProvider({ children }: { children: ReactNode }) {
  const [{ cities, isLoading }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCities() {
      dispatch({ type: "loading" })

      try {
        const resp = await fetch(citiesUrl, {
          signal: controller.signal,
        })

        const data: Cities[] = await resp.json()
        dispatch({ type: "cities/loaded", payload: data })
      } catch (err) {
        // An aborted request is replaced by the next one, so leave isLoading alone
        if (err instanceof Error && err.name === "AbortError") return

        console.error(err)
        dispatch({ type: "loading/finished" })
      }
    }

    fetchCities()

    return () => controller.abort()
  }, [])

  async function addCity(newCity: Omit<Cities, "id">) {
    const resp = await fetch(citiesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCity),
    })

    if (!resp.ok) {
      throw new Error("Could not add the city. Please try again.")
    }

    const data: Cities = await resp.json()
    dispatch({ type: "city/created", payload: data })
  }

  async function deleteCity(id: Cities["id"]) {
    const resp = await fetch(`${citiesUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!resp.ok) {
      throw new Error("Could not delete the city. Please try again.")
    }

    dispatch({ type: "city/deleted", payload: id })
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        addCity,
        deleteCity,
        isLoading,
      }}
    >
      {children}
    </CityContext.Provider>
  )
}

export function useCities() {
  const context = useContext(CityContext)

  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider")
  }

  return context
}