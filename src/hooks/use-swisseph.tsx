
import { useState, useEffect } from 'react';

// Define the SwissEph type here to avoid direct imports
// This type definition matches the structure of the swisseph-wasm module
export interface SwissEph {
  swe_julday: (year: number, month: number, day: number, hour: number, flag: number) => number;
  swe_calc_ut: (julDay: number, planet: number, flag: number) => { longitude: number; latitude: number; distance: number };
  swe_houses_ex: (julDay: number, flag: number, lat: number, lon: number, hsys: string) => { 
    ascendant: number; 
    mc: number; 
    armc: number; 
    vertex: number; 
    equasc: number;
    cusps: number[]; 
  };
  swe_set_sid_mode: (mode: number, t0: number, ayan_t0: number) => void;
  SE_SIDM_LAHIRI: number;
  SE_GREG_CAL: number;
  SEFLG_SIDEREAL: number;
}

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
          
          // Dynamically import the module
          const swissephModule = await import('swisseph-wasm');
          
          // Use a relative path that will work with Vite's asset handling
          const instance = await swissephModule.load({
            // Use a relative path that works with Vite
            wasmPath: '/swisseph-wasm.wasm'
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
