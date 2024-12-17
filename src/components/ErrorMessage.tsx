import { useContext } from 'react';
import { ErrorContext } from '../context/ErrorContext';

export const GlobalErrorMessage: React.FC = () => {
  const { error } = useContext(ErrorContext);

  if (!error) {
    return null;
  }

  return <p className="error notification is-danger is-light">{error}</p>;
};
