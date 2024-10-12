import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', category: '', supplier: '' });
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState(null); 


  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('inventoryItems')) || [];
    setItems(storedItems);
    setLoading(false);
  }, []);


  useEffect(() => {
    localStorage.setItem('inventoryItems', JSON.stringify(items));
  }, [items]);

  const getStockClass = (quantity) => {
    if (quantity === 0) return 'text-danger'; 
    if (quantity < 5) return 'text-warning'; 
    return 'text-success'; 
  };

  const handleAddOrUpdateItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.quantity || !newItem.category || !newItem.supplier) {
      toast.error('Please fill in all fields');
      return;
    }

    if (isEditing) {

      const updatedItems = items.map((item, index) => 
        index === editingItemIndex ? newItem : item
      );
      setItems(updatedItems);
      toast.success(`${newItem.name} updated successfully!`);
      setIsEditing(false); 
      setEditingItemIndex(null); 
    } else {

      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      toast.success(`${newItem.name} added successfully!`);
    }
    setNewItem({ name: '', quantity: '', category: '', supplier: '' }); 
  };

  const handleDeleteItem = (itemName) => {
    const updatedItems = items.filter(item => item.name !== itemName);
    setItems(updatedItems); 
    toast.success(`${itemName} deleted successfully!`); 
  };

  const handleEditItem = (index) => {
    setIsEditing(true); 
    setEditingItemIndex(index); 
    setNewItem(items[index]); 
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-light">Inventory Dashboard</h1>

      <form onSubmit={handleAddOrUpdateItem} className="mb-4">
        <div className="row">
          <div className="col-md-3 mb-3">
            <label htmlFor="itemName" className="form-label text-light">Item Name</label>
            <input
              id="itemName"
              type="text"
              className="form-control"
              placeholder="Enter item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="itemQuantity" className="form-label text-light">Quantity</label>
            <input
              id="itemQuantity"
              type="number"
              className="form-control"
              placeholder="Enter quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              min="0"
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="itemCategory" className="form-label text-light">Category</label>
            <input
              id="itemCategory"
              type="text"
              className="form-control"
              placeholder="Enter category"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="itemSupplier" className="form-label text-light">Supplier</label>
            <input
              id="itemSupplier"
              type="text"
              className="form-control"
              placeholder="Enter supplier name"
              value={newItem.supplier}
              onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-dark mt-3">{isEditing ? 'Update Item' : 'Add Item'}</button>
      </form>


      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Item Name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="row">
        {filteredItems.map((item, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p>
                <p className="card-text"><strong>Category:</strong> {item.category}</p>
                <p className="card-text"><strong>Supplier:</strong> {item.supplier}</p>
                <p className={`card-text ${getStockClass(item.quantity)}`}>
                  <strong>Stock Level:</strong> 
                  {item.quantity === 0 ? ' Out of Stock' : item.quantity < 5 ? ' Low Stock' : ' Sufficient Stock'}
                </p>
                <button className="btn btn-dark" onClick={() => handleEditItem(index)}>Edit</button>
                <button className="btn btn-dark" onClick={() => handleDeleteItem(item.name)} style={{marginLeft:'200px'}}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer autoClose={1000} /> 
    </div>
  );
};

export default Dashboard;
