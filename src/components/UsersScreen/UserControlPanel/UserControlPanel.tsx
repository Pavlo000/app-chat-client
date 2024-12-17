import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { IUser } from '../../../types';
import { useSearch } from '../../../hooks/useSearch';
import { useEffect } from 'react';

type Props = {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
};

export const UserControlPanel: React.FC<Props> = ({ users, setUsers }) => {
  const location = useLocation();
  const path = location.pathname;

  const { filteredArray: filteredUsers, search, setSearch } = useSearch({ initialValue: '', array: users, searchFields: ['id'] });

  const handleLinkClassName = ({isActive, isPending}: {isActive: boolean, isPending: boolean}) => {
    return cn('ControlPanel__link', {
      'ControlPanel__link--active': isActive,
      'ControlPanel__link--pending': isPending,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    setUsers(filteredUsers as IUser[]);
  }, [search]);

  return (
    <div className="ControlPanel">
      <div className="ControlPanel__search">
        <input type="text" placeholder="Search users..." className="ControlPanel__search-input" onChange={handleSearchChange} />
      </div>
      <NavLink to="/users" className={path === '/users' ? handleLinkClassName : 'ControlPanel__link'}>
        All
      </NavLink>
      <NavLink to="/users/people" className={handleLinkClassName}>
        People
      </NavLink>
      <NavLink to="/users/ai-models" className={handleLinkClassName}>
        AI Models
      </NavLink>
    </div>
  );
};
