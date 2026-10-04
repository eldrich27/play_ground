import { useReducer, createContext, type ReactNode, useContext } from "react"
import type { User } from "../types/User"

// Never keep the password in state or in storage
type SessionUser = Omit<User, "password">

interface AuthContextValues {
  isAuthenticated: boolean
  user: SessionUser | null
  login: (email: string, password: string) => void
  logout: () => void
}

type AuthAction =
  | { type: "LOGIN"; payload: SessionUser }
  | { type: "LOGOUT" }

interface AuthState {
  isAuthenticated: boolean
  user: SessionUser | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

// The session lives in localStorage so a page reload (e.g. typing a URL) keeps you logged in
const STORAGE_KEY = "worldwise:user"

function loadSession(): AuthState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return initialState

    const user: SessionUser = JSON.parse(stored)
    if (!user?.email || !user?.name) return initialState

    return { isAuthenticated: true, user }
  } catch {
    // Blocked storage or a corrupted value: just start logged out
    return initialState
  }
}

function saveSession(user: SessionUser | null) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage unavailable: the login still works until the page reloads
  }
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
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState, loadSession)

  const login = (email: string, password: string) => {
    if (email !== FAKE_USER.email || password !== FAKE_USER.password) {
      throw new Error("Invalid email or password")
    }
    const { password: _password, ...sessionUser } = FAKE_USER
    saveSession(sessionUser)
    dispatch({ type: "LOGIN", payload: sessionUser })
  }

  const logout = () => {
    saveSession(null)
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