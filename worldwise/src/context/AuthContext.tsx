import { useReducer, createContext, type ReactNode, useContext } from "react"

interface User {
  id: string
  name: string
}

interface AuthContextValues {
  isAuthenticated: boolean
  user: User | null
  login: () => void
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

  const login = () => {
    dispatch({ type: "LOGIN", payload: { id: "1", name: "John Doe" } })
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