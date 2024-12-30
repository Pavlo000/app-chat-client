import { useContext } from 'react';
import { ErrorContext } from '../context/ErrorContext';

export const ErrorMessage: React.FC = () => {
  const { error } = useContext(ErrorContext);

  if (!error) {
    return null;
  }

  return <div className="ErrorMessage">
    <p className="ErrorMessage__message">{error}</p>
  </div>;
};
