import React, { useContext } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import cn from 'classnames';

type Props = {
  setError: React.Dispatch<React.SetStateAction<string>>,
}

export const Navbar: React.FC<Props> = ({ setError }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const handleButton = () => {
    navigate('/chats');
  }

  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-start">
        <NavLink to="/" className="navbar-item">
          Home
        </NavLink>

        {user && (
          <>
            <NavLink to="/users" className="navbar-item">
              Users
            </NavLink>
            <NavLink to="/chats" className="navbar-item">
              Chats
            </NavLink>
            {location.pathname.includes('/direct/') && (
              <div
                className={cn('navbar-item', 'is-pointerless', 'has-background-light')}
              >
                Direct
                <button className="delete ml-2" onClick={handleButton}></button>
              </div>
            )}
          </>
        )}

      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {user ? (
              <button
                className="button is-light has-text-weight-bold"
                onClick={() => {
                  logout()
                    .then(() => {
                      navigate('/');
                    })
                    .catch((error) => {
                      setError(error.response.data.message);
                    });
                }}
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/sign-up"
                  className="button is-light has-text-weight-bold"
                >
                  Sign up
                </Link>

                <Link
                  to="/login"
                  className="button is-success has-text-weight-bold"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
