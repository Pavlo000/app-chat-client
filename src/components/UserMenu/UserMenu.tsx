import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


import { Link } from 'react-router-dom';

export const UserMenu: React.FC = () => {
  const { user } = useContext(AuthContext);



  if (!user) {
    return null;
  }

  return (
    <div className="UserMenu">
      <figure className="UserMenu__figure">
        <img 
          className="UserMenu__image"
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <figcaption className="UserMenu__figcaption">
          <h4 className="UserMenu__name">{user.firstName} {user.lastName}</h4>
          <p className="UserMenu__email">{user.email}</p>
        </figcaption>
      </figure>
      <Link to="/profile" className="UserMenu__button">
        <i className="UserMenu__icon fa fa-cog"></i> Settings
      </Link>
    </div>
  );
};
