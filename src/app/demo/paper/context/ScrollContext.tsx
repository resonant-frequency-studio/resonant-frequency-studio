'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ScrollContextValue {
  boxScaleComplete: boolean;
  setBoxScaleComplete: (value: boolean) => void;
}

const ScrollContext = createContext<ScrollContextValue | undefined>(undefined);

export function ScrollContextProvider({ children }: { children: ReactNode }) {
  const [boxScaleComplete, setBoxScaleComplete] = useState(false);

  return (
    <ScrollContext.Provider value={{ boxScaleComplete, setBoxScaleComplete }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error(
      'useScrollContext must be used within a ScrollContextProvider'
    );
  }
  return context;
}
