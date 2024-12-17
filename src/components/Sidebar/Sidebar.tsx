import { Navbar } from '../Navbar';
import { UserMenu } from '../UserMenu';

export const Sidebar: React.FC = () => {

  return (
    <div className="Sidebar">
      <h1 className="Sidebar__title">WeeChat</h1>
      <Navbar />
      <UserMenu />
    </div>
  );
};