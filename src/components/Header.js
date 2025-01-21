import React, { useState } from 'react';

function Header({ setIsLoggedIn }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <header className="header_container">
      {/* Logo con texto */}
      <div className="header_logo">
        <img width={45} src='/assets/images/icon.avif' />
        Taskana
      </div>

      {/* Avatar con menú desplegable */}
      <div className="header_avatar_container" onClick={toggleDropdown}>
        <div className="header_avatar">JD</div>
        {isDropdownOpen && (
          <div className="user_dropdown">
            <p className="user_name">John Doe</p>
            <p className="user_email">johndoe@example.com</p>
            <button onClick={handleLogout} className="logout_button">Log Out</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
