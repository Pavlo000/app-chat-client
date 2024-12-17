import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navbar } from '../Navbar';
import cn from 'classnames';

export const Header: React.FC = () => {
  const { user } = useContext(AuthContext);


  return <div className={cn('Header', {
    'Header--wide': !user,
  })}>
    <h2 className="Header__title">Welcome to the WeeChat</h2>

    {!user && (
      <Navbar />
    )}
  </div>;
};
