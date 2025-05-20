
import { useState, useEffect } from 'react';
import { load as loadSwissEph } from 'swisseph-wasm';

// SwissEph instance type definition
type SwissEph = Awaited<ReturnType<typeof loadSwissEph>>;

// Status enum for WASM loading states
export enum WasmLoadingStatus {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
  IDLE = 'idle'
}

// Custom hook to load and provide SwissEph
export function useSwissEph() {
  const [swissEph, setSwissEph] = useState<SwissEph | null>(null);
  const [status, setStatus] = useState<WasmLoadingStatus>(WasmLoadingStatus.IDLE);
  const [error, setError] = useState<Error | null>(null);

  // Load the WASM module when the component mounts
  useEffect(() => {
    let isMounted = true;

    const loadEphemeris = async () => {
      try {
        if (status !== WasmLoadingStatus.LOADING && !swissEph) {
          setStatus(WasmLoadingStatus.LOADING);
          
          // Use a relative path that will work with Vite's asset handling
          const instance = await loadSwissEph({
            // Use a relative path that works with Vite
            wasmPath: '/swisseph-wasm.wasm',
            // Default ephemeris path if you add .se1 files later
            // ephemerisPath: '/ephemeris'
          });
          
          // Set Lahiri ayanamsa as default (Vedic astrology)
          instance.swe_set_sid_mode(instance.SE_SIDM_LAHIRI, 0, 0);
          
          if (isMounted) {
            setSwissEph(instance);
            setStatus(WasmLoadingStatus.LOADED);
          }
        }
      } catch (err) {
        console.error('Error loading SwissEph WASM:', err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error loading SwissEph'));
          setStatus(WasmLoadingStatus.ERROR);
        }
      }
    };

    loadEphemeris();

    // Cleanup function to avoid memory leaks
    return () => {
      isMounted = false;
    };
  }, [status, swissEph]);

  return { swissEph, status, error };
}
