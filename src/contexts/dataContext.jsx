import React, { createContext } from "react";

export const dataProvider = createContext();

export function DataComponent({ children }) {
  let data = [
    {x:'w',y:12},
    {x:'d',y:14},
    {x:'f',y:32}
  ]
  return (
    <dataProvider.Provider value={{ data }}>
      {children}
    </dataProvider.Provider>
  );
}
