// import { useState } from 'react';
// import cn from 'classnames';
import { IChat, IQueryOptions } from '../../../types';

type Props = {
  userId: string;
  loadChats: (prevChats: IChat[], userId: string, query: Partial<IQueryOptions>) => void;
  limit: number;
  sortBy: string;
};

export const ChatControlPanel: React.FC<Props> = ({ userId, loadChats, limit, sortBy }) => {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const handleDropdownClick = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    loadChats([], userId, { offset: 0, limit, sortBy, search: event.target.value });
  };

  // const handleDropdownClassName = ({isActive}: {isActive: boolean}) => {
  //   return cn('ControlPanel__dropdown-content', {
  //     'ControlPanel__dropdown-content--active': isActive,
  //   });
  // };

  return (
    <div className="ControlPanel">
      <div className="ControlPanel__search">
        <input type="text" placeholder="Search chats..." className="ControlPanel__search-input" onChange={handleSearchChange} />
      </div>
      {/* <div className="ControlPanel__dropdown ControlPanel__dropdown--right">
        <button 
          className="ControlPanel__dropdown-button" 
          onClick={handleDropdownClick} 
          aria-label="Create new chat dropdown button"
        >
          <i className="ControlPanel__icon fa fa-chevron-down" /> Create new chat
        </button>
        <div 
          className={handleDropdownClassName({isActive: isDropdownOpen})} 
          aria-expanded={isDropdownOpen} 
          aria-label="Create new chat dropdown"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, aperiam?
        </div>
      </div> */}
    </div>
  );
};
