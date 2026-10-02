// hooks/useGeolocation.ts
import { useState, useEffect } from "react";

interface GeoPosition {
  lat: number;
  lng: number;
}

interface GeolocationState {
  position: GeoPosition | null;
  error: string | null;
  isLoading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    error: null,
    isLoading: true,  // true until we get a first answer (success OR error)
  });

  useEffect(() => {
    // Guard: browser might not support geolocation (very old browsers)
    if (!navigator.geolocation) {
      setState({
        position: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      });
      return;
    }
    
    // getCurrentPosition can't be cancelled, so ignore its result after unmount
    let ignore = false;
    // Ask the browser for the position (async — user may take time to decide)
    navigator.geolocation.getCurrentPosition(
      // Success callback — position comes wrapped in a GeolocationPosition object
      (pos) =>
        setState({
          position: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
          error: null,
          isLoading: false,
        }),

      // Error callback — denied permission, timeout, no signal...
      (err) =>
        setState({
          position: null,
          error: err.message,
          isLoading: false,
        })
    );

    // Cleanup: cancel the pending request if the component unmounts first
    return () => {
      ignore = true;
    };
  }, []);  // empty deps = ask once on mount

  return state;  // { position, error, isLoading }
}