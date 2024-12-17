
import React, { useMemo, useState } from 'react';

type ErrorContextType = {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export const ErrorContext = React.createContext({} as ErrorContextType);

type Props = {
  children: React.ReactNode;
};

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState('');

  const value = useMemo(
    () => ({
      error,
      setError,
    }),
    [error]
  );

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>;
};
