
import { useState, useEffect } from 'react';
import * as swisseph from 'swisseph';

// Define the SwissEph type here to avoid direct imports
// This type definition matches the structure we need for the app
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

// Status enum for library loading states
export enum WasmLoadingStatus {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
  IDLE = 'idle'
}

// Create a wrapper around the swisseph library to match our interface
const createSwissEphWrapper = (): SwissEph => {
  return {
    swe_julday: (year, month, day, hour, flag) => {
      return swisseph.swe_julday(year, month, day, hour, flag);
    },
    swe_calc_ut: (julDay, planet, flag) => {
      const result = swisseph.swe_calc_ut(julDay, planet, flag);
      return { 
        longitude: result.longitude, 
        latitude: result.latitude, 
        distance: result.distance 
      };
    },
    swe_houses_ex: (julDay, flag, lat, lon, hsys) => {
      const result = swisseph.swe_houses(julDay, lat, lon, hsys);
      return { 
        ascendant: result.ascendant, 
        mc: result.mc, 
        armc: result.armc, 
        vertex: result.vertex, 
        equasc: result.equasc,
        cusps: result.cusps
      };
    },
    swe_set_sid_mode: (mode, t0, ayan_t0) => {
      swisseph.swe_set_sid_mode(mode, t0, ayan_t0);
    },
    SE_SIDM_LAHIRI: swisseph.SE_SIDM_LAHIRI,
    SE_GREG_CAL: swisseph.SE_GREG_CAL,
    SEFLG_SIDEREAL: swisseph.SEFLG_SIDEREAL
  };
};

// Custom hook to load and provide SwissEph
export function useSwissEph() {
  const [swissEph, setSwissEph] = useState<SwissEph | null>(null);
  const [status, setStatus] = useState<WasmLoadingStatus>(WasmLoadingStatus.IDLE);
  const [error, setError] = useState<Error | null>(null);

  // Load the library when the component mounts
  useEffect(() => {
    let isMounted = true;

    const loadEphemeris = async () => {
      try {
        if (status !== WasmLoadingStatus.LOADING && !swissEph) {
          setStatus(WasmLoadingStatus.LOADING);
          
          // Initialize the swisseph library
          console.log('Initializing SwissEph library');
          
          // Create a wrapper around the swisseph library
          const ephemerisInstance = createSwissEphWrapper();
          
          // Set Lahiri ayanamsa as default (Vedic astrology)
          ephemerisInstance.swe_set_sid_mode(ephemerisInstance.SE_SIDM_LAHIRI, 0, 0);
          
          if (isMounted) {
            setSwissEph(ephemerisInstance);
            setStatus(WasmLoadingStatus.LOADED);
            console.log('SwissEph library loaded successfully');
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
