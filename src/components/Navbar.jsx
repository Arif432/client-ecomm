import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="flex justify-end p-4 pt-0">
      <nav>
        <ul className="flex list-none m-0 p-0">
          <li className="inline mr-4">
            <Link to="/">Home</Link>
          </li>
          {/* <li className="inline mr-4">
            <Link to="/logout">logout</Link>
          </li> */}

          <li className="inline mr-4">
            <Link to="/admin">admin</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
