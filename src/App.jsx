// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Dashboard from './components/Dashboard';
import ManageItems from './components/ManageItems';
import ManageSuppliers from './components/ManageSuppliers';
import Header from './components/Header';
import './app.css'


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage-items" element={<ManageItems />} />
        <Route path="/manage-suppliers" element={<ManageSuppliers />} />
      </Routes>
    </Router>
  );
};

export default App;
