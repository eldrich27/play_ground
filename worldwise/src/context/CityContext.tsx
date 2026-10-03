import { useState, useEffect, createContext, useContext, type ReactNode } from "react"

import type { Cities } from "../types/Cities"

interface CityContextValues {
  cities: Cities[]
  isLoading: boolean
  addCity: (newCity: Omit<Cities, "id">) => Promise<void>
  deleteCity: (id: Cities["id"]) => Promise<void>
}

const CityContext = createContext<CityContextValues | undefined>(undefined)

const citiesUrl = import.meta.env.VITE_CITIES_URL

export function CitiesProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<Cities[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCities() {
      setIsLoading(true)

      try {
        const resp = await fetch(citiesUrl, {
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
    setCities((prev) => [...prev, data])
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

    setCities((prev) => prev.filter((city) => city.id !== id))
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