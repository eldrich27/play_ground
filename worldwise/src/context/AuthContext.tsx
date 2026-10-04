import { useReducer, createContext, type ReactNode, useContext } from "react"

interface User {
  id: string
  name: string,
  email: string,
  password: string,
  avatarUrl: string
}

interface AuthContextValues {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "Error"; payload: string }

interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

const FAKE_USER: User = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  password: "password123",
  avatarUrl: "https://i.pravatar.cc/100?u=zz",
}

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload }
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null }
    case "Error":
      console.error(action.payload)
      return state
    default:
      return state
  }
}

const AuthContext = createContext<AuthContextValues | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState)

  const login = (email: string, password: string) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "LOGIN", payload: FAKE_USER })
    } else {
    //   throw new Error("Invalid email or password")
      dispatch({ type: "Error", payload: "Invalid email or password" })
    }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  const value: AuthContextValues = {
    isAuthenticated,
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}