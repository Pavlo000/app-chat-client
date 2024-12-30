import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { IQueryOptions, IUser } from '../../../types';
import { debounce } from '../../../utils/debounce';

type Props = {
  loadUsers: (prevUsers: IUser[], params: Partial<IQueryOptions>) => void;
  limit: number;
  sortBy: string;
};

export const UserControlPanel: React.FC<Props> = ({ loadUsers, limit, sortBy }) => {
  const location = useLocation();
  const path = location.pathname;

  const handleLinkClassName = ({isActive, isPending}: {isActive: boolean, isPending: boolean}) => {
    return cn('ControlPanel__link', {
      'ControlPanel__link--active': isActive,
      'ControlPanel__link--pending': isPending,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    loadUsers([], { offset: 0, limit, sortBy, search: event.target.value });
  };

  return (
    <div className="ControlPanel">
      <div className="ControlPanel__search">
        <input type="text" placeholder="Search users..." className="ControlPanel__search-input" onChange={debounce(handleSearchChange, 300)} />
      </div>
      <NavLink to="/users" className={path === '/users' ? handleLinkClassName : 'ControlPanel__link'}>
        All
      </NavLink>
      {/* <NavLink to="/users/people" className={handleLinkClassName}>
        People
      </NavLink>
      <NavLink to="/users/ai-models" className={handleLinkClassName}>
        AI Models
      </NavLink> */}
    </div>
  );
};
