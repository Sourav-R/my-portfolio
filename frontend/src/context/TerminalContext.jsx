import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const TerminalContext = createContext(null);

export const TerminalProvider = ({ children }) => {
  const [autoLog, setAutoLog] = useState(null);
  const timeoutRef = useRef(null);

  const pushLog = useCallback((text) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAutoLog(text);
  }, []);

  const clearLog = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setAutoLog(null);
    }, 600);
  }, []);

  return (
    <TerminalContext.Provider value={{ autoLog, pushLog, clearLog }}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => {
  const ctx = useContext(TerminalContext);
  if (!ctx) return { autoLog: null, pushLog: () => {}, clearLog: () => {} };
  return ctx;
};
