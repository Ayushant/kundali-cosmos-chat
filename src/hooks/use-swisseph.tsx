
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

// Mock implementation since the real swisseph-wasm package doesn't exist
const createMockSwissEph = (): SwissEph => {
  return {
    swe_julday: (year, month, day, hour, flag) => {
      // Return mock Julian day (approximate for May 20, 2025)
      return 2460785.5 + hour/24;
    },
    swe_calc_ut: (julDay, planet, flag) => {
      // Return mock planet position
      return { 
        longitude: planet * 30 % 360, 
        latitude: 0, 
        distance: 1 
      };
    },
    swe_houses_ex: (julDay, flag, lat, lon, hsys) => {
      // Return mock houses
      const cusps = Array(13).fill(0).map((_, i) => (i * 30) % 360);
      return { 
        ascendant: 0, 
        mc: 270, 
        armc: 270, 
        vertex: 90, 
        equasc: 0,
        cusps 
      };
    },
    swe_set_sid_mode: () => {},
    SE_SIDM_LAHIRI: 1,
    SE_GREG_CAL: 1,
    SEFLG_SIDEREAL: 256
  };
};

// Custom hook to load and provide SwissEph
export function useSwissEph() {
  const [swissEph, setSwissEph] = useState<SwissEph | null>(null);
  const [status, setStatus] = useState<WasmLoadingStatus>(WasmLoadingStatus.IDLE);
  const [error, setError] = useState<Error | null>(null);

  // Load the mock implementation when the component mounts
  useEffect(() => {
    let isMounted = true;

    const loadEphemeris = async () => {
      try {
        if (status !== WasmLoadingStatus.LOADING && !swissEph) {
          setStatus(WasmLoadingStatus.LOADING);
          
          // Since swisseph-wasm doesn't exist, we'll always use the mock implementation
          console.log('Using mock SwissEph implementation');
          const mockInstance = createMockSwissEph();
          
          if (isMounted) {
            setSwissEph(mockInstance);
            setStatus(WasmLoadingStatus.LOADED);
          }
        }
      } catch (err) {
        console.error('Error in SwissEph loading process:', err);
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
