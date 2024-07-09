import { createContext, useContext } from "react";

export const StorageContext = createContext({
  getItem: (key: string) => {
    return localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
});

export function useStorage() {
  return useContext(StorageContext);
}
