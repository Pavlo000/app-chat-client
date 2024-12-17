import React, { useContext } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import cn from 'classnames';

import { IError } from '../../types/IError';
import { AxiosError } from 'axios';
import { usePageError } from '../../hooks/usePageError';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [, setError] = usePageError();

  const handleRedirectToDirect = () => {
    navigate('/chats');
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate('/');
      })
      .catch((error: AxiosError<IError>) => {
        setError(error.response?.data?.message || 'Failed to log out');
      });
  };
  
  const buildNavbarItemClass = ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) => cn('Navbar__item', {
    'Navbar__item--active': isActive && !location.pathname.includes('/chats/'),
    'Navbar__item--pending': isPending,
  });

  return (
    <nav
      className={cn('Navbar', {
        'Navbar--header': !user,
      })}
      role="navigation"
      aria-label="main navigation"
    >

      {user ? (
        <>
          <NavLink to="/" className={buildNavbarItemClass}>
            <i className="Navbar__item--icon fa fa-home"></i> Home
          </NavLink>
          <NavLink to="/users" className={buildNavbarItemClass}>
            <i className="Navbar__item--icon fa fa-user"></i> People
          </NavLink>
          <NavLink to="/chats" className={buildNavbarItemClass}>
            <i className="Navbar__item--icon fa fa-comments"></i> Chats and Groups
          </NavLink>
          {location.pathname.includes('/chats/') && (
            <div
              className={cn(
                'Navbar__item',
                'Navbar__item--temporary',
              )}
            >
              <i className="Navbar__item--icon fa fa-comments"></i> Direct
              <button className="Navbar__item--temporary-button" onClick={handleRedirectToDirect}>
                <i className="Navbar__item--icon fa fa-close"></i>
              </button>
            </div>
          )}

          <span className="Navbar__item--separator"></span>

          <Link 
            to="/"
            className={buildNavbarItemClass({ isActive: false, isPending: false })}
            role="button"
            onClick={handleLogout}
          >
            <i className="Navbar__item--icon fa fa-sign-out"></i> Log out
          </Link>
        </>
      ) : (
        <>
          <NavLink
            to="/sign-up"
            className={buildNavbarItemClass}
          >
            Sign up
          </NavLink>

          <NavLink
            to="/login"
            className={buildNavbarItemClass}
          >
            Log in
          </NavLink>
        </>
      )}
    </nav>
  );
};
