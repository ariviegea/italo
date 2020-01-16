import React from 'react';
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className='navigation'>
      <nav>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/apartments">
          <li>Apartments</li>
        </Link>
        <Link to="/admin">
          <li>Admin</li>
        </Link>
      </nav>
    </div>
  );
}

export default Navigation;