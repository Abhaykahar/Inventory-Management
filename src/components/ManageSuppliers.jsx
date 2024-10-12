import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', itemsSupplied: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingSupplierName, setEditingSupplierName] = useState('');

  useEffect(() => {
    const storedSuppliers = localStorage.getItem('inventorySuppliers');
    if (storedSuppliers) {
      setSuppliers(JSON.parse(storedSuppliers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inventorySuppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  const handleAddOrUpdateSupplier = (e) => {
    e.preventDefault();
    if (!newSupplier.name || !newSupplier.contact || !newSupplier.itemsSupplied) {
      toast.error('Please fill in all fields');
      return;
    }

    if (isEditing) {
      const updatedSuppliers = suppliers.map((supplier) =>
        supplier.name === editingSupplierName ? newSupplier : supplier
      );
      setSuppliers(updatedSuppliers);
      toast.success(`${newSupplier.name} updated successfully!`);
      setIsEditing(false);
      setEditingSupplierName('');
    } else {
      const updatedSuppliers = [...suppliers, newSupplier];
      setSuppliers(updatedSuppliers);
      toast.success(`${newSupplier.name} added successfully!`);
    }
    setNewSupplier({ name: '', contact: '', itemsSupplied: '' });
  };

  const handleDeleteSupplier = (supplierName) => {
    const updatedSuppliers = suppliers.filter(supplier => supplier.name !== supplierName);
    setSuppliers(updatedSuppliers);
    toast.success(`${supplierName} deleted successfully!`);
  };

  const handleEditSupplier = (supplier) => {
    setNewSupplier(supplier);
    setIsEditing(true);
    setEditingSupplierName(supplier.name);
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-light">{isEditing ? 'Edit Supplier' : 'Manage Suppliers'}</h1>
      
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search Suppliers by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <form onSubmit={handleAddOrUpdateSupplier} className="mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Supplier Name"
              value={newSupplier.name}
              onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Contact Details"
              value={newSupplier.contact}
              onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Items Supplied"
              value={newSupplier.itemsSupplied}
              onChange={(e) => setNewSupplier({ ...newSupplier, itemsSupplied: e.target.value })}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-dark">{isEditing ? 'Update Supplier' : 'Add Supplier'}</button>
      </form>

      <div className="row">
        {filteredSuppliers.map((supplier, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{supplier.name}</h5>
                <p className="card-text"><strong>Contact:</strong> {supplier.contact}</p>
                <p className="card-text"><strong>Items Supplied:</strong> {supplier.itemsSupplied}</p>
                <button className="btn btn-dark" onClick={() => handleEditSupplier(supplier)}>Edit</button>
                <button className="btn btn-dark" onClick={() => handleDeleteSupplier(supplier.name)} style={{marginLeft:'200px'}}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default ManageSuppliers;
