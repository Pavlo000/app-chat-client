import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useSearch } from '../../../hooks/useSearch';
import { IChat } from '../../../types';

type Props = {
  chats: IChat[];
  setChats: (chats: IChat[]) => void;
};

export const ChatControlPanel: React.FC<Props> = ({ chats, setChats }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { filteredArray: filteredChats, search, setSearch } = useSearch({ initialValue: '', array: chats, searchFields: ['id'] });

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    setChats(filteredChats as IChat[]);
    console.log(filteredChats);
  }, [search]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleDropdownClassName = ({isActive}: {isActive: boolean}) => {
    return cn('ControlPanel__dropdown-content', {
      'ControlPanel__dropdown-content--active': isActive,
    });
  };

  return (
    <div className="ControlPanel">
      <div className="ControlPanel__search">
        <input type="text" placeholder="Search chats..." className="ControlPanel__search-input" onChange={handleSearchChange} />
      </div>
      <div className="ControlPanel__dropdown ControlPanel__dropdown--right">
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
      </div>
    </div>
  );
};
