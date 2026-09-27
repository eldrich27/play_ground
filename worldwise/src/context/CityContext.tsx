import { useState, useEffect, createContext, useContext, type ReactNode } from "react"

import type { Cities } from "../types/Cities"

interface CityContextValues {
  cities: Cities[]
  isLoading: boolean
}

const CityContext = createContext<CityContextValues | undefined>(undefined)

export function CitiesProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<Cities[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCities() {
      setIsLoading(true)

      try {
        const resp = await fetch("http://localhost:3031/cities", {
          signal: controller.signal,
        })

        const data = await resp.json()
        setCities(data)
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error(err)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()

    return () => controller.abort()
  }, [])

  return (
    <CityContext.Provider value={{ cities, isLoading }}>
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