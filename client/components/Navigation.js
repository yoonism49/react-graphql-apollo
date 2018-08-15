import React from 'react';
import { Link } from 'react-router-dom'

const Navigation = ({ children }) => (
  <div>
    <nav>
      <Link to='/'> Show All </Link>|
      <Link to='/newresevation'> New Hotel Reservation </Link>|
    </nav>
    { children }
  </div>
);

export default Navigation;
