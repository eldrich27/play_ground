import { useReducer, createContext, type ReactNode, useContext } from "react"
import type { User } from "../types/User"

interface AuthContextValues {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }

interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}


const FAKE_USER:User = JSON.parse(import.meta.env.VITE_FAKE_USER)

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload }
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null }
    default:
      return state
  }
}

const AuthContext = createContext<AuthContextValues | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState)

  const login = (email: string, password: string) => {
    if (email !== FAKE_USER.email || password !== FAKE_USER.password) {
      throw new Error("Invalid email or password")
    }
    dispatch({ type: "LOGIN", payload: FAKE_USER })
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