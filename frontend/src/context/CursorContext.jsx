import { createContext, useContext, useState } from "react";

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
  const [cursorText, setCursorText] = useState("");

  const hoverEnter = (text) => setCursorText(text);
  const hoverLeave = () => setCursorText("");

  return (
    <CursorContext.Provider value={{ cursorText, hoverEnter, hoverLeave, setCursorText }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  return useContext(CursorContext);
};
