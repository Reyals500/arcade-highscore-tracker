import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Retro Arcade High Score Tracking App</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
          <Dropdown>
          <MenuButton>Dashboard</MenuButton>
          <Menu>
            <MenuItem>
            <Link className="navLink" to="/user">
              Home
            </Link>
            </MenuItem>
            <MenuItem>
            <Link className="navLink" to="/info">
              Info Page
            </Link>
            </MenuItem>
            <MenuItem>
            <Link className="navLink" to="/singleGame">
              Single Game Page
            </Link>
            </MenuItem>
            <MenuItem>
            <Link className="navLink" to="/editScore">
              Edit Score
            </Link>
            </MenuItem>
            <MenuItem>
            <LogOutButton className="navLink" />
            </MenuItem>
            </Menu>
            </Dropdown>
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
