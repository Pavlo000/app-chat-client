import { ProfileForm } from '../components/ProfileScreen/ProfileForm';

export const ProfileScreen: React.FC = () => {
  return (
    <div className="Screen">
      <div className="Screen__form">
        <ProfileForm />
      </div>
    </div>
  );
};