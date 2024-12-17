import { useContext, useEffect } from 'react';
import { ErrorContext } from '../context/ErrorContext';

export const usePageError = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const { error, setError } = useContext(ErrorContext);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timerId = setTimeout(() => {
      setError('');
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  return [error, setError];
};
