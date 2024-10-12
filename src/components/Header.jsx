import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">Inventory Management</Link>
        <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/manage-items">Manage Items</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/manage-suppliers">Manage Suppliers</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
