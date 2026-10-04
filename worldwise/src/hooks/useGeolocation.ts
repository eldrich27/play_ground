// hooks/useGeolocation.ts
import { useState, useEffect, useRef } from "react";

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
    isLoading: false,  // nothing is requested until getPosition is called
  });

  // getCurrentPosition can't be cancelled, so remember if we unmounted and ignore late results
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Ask the browser for the position on demand (e.g. when a button is clicked)
  function getPosition() {
    // Guard: browser might not support geolocation (very old browsers)
    if (!navigator.geolocation) {
      setState({
        position: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      });
      return;
    }

    setState((prev) => ({ ...prev, error: null, isLoading: true }));

    navigator.geolocation.getCurrentPosition(
      // Success callback — position comes wrapped in a GeolocationPosition object
      (pos) => {
        if (!isMounted.current) return;
        // accuracy is in metres — thousands of metres means the browser guessed from your IP, not Wi-Fi/GPS
        console.log(`Location accuracy: ${Math.round(pos.coords.accuracy)} m`);
        setState({
          position: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },

      // Error callback — denied permission, timeout, no signal...
      (err) => {
        if (!isMounted.current) return;
        setState({
          position: null,
          error: err.message,
          isLoading: false,
        });
      },

      {
        enableHighAccuracy: true, // prefer Wi-Fi/GPS over a rough IP-based guess
        maximumAge: 0,            // don't reuse a cached (possibly old) position
        timeout: 10000,           // give up after 10s instead of waiting forever
      }
    );
  }

  return { ...state, getPosition };  // { position, error, isLoading, getPosition }
}
