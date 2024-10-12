import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', category: '', supplier: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSupplier, setFilterSupplier] = useState('');
  const [isUpdating, setIsUpdating] = useState(false); 


  useEffect(() => {
    const storedItems = localStorage.getItem('inventoryItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('inventoryItems', JSON.stringify(items));
  }, [items]);

  const handleAddOrUpdateItem = (e) => {
    e.preventDefault();
    const { name, quantity, category, supplier } = newItem;

    if (!name || !quantity || !category || !supplier) {
      toast.error('Please fill in all fields'); 
      return;
    }

    if (isUpdating) {

      const updatedItems = items.map(item =>
        item.name === newItem.name ? newItem : item
      );
      setItems(updatedItems);
      toast.success(`${newItem.name} updated successfully!`);
    } else {

      if (items.some(item => item.name === name)) {
        toast.error('Item already exists!'); 
      }


      setItems([...items, newItem]);
      toast.success(`${newItem.name} added successfully!`); 
    }

    setNewItem({ name: '', quantity: '', category: '', supplier: '' }); 
    setIsUpdating(false); 
  };

  const handleEditItem = (item) => {
    setNewItem(item);
    setIsUpdating(true); 
  };

  const handleDeleteItem = (itemName) => {
    const updatedItems = items.filter(item => item.name !== itemName);
    setItems(updatedItems);
    toast.success(`${itemName} deleted successfully!`);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory ? item.category === filterCategory : true;
    const matchesSupplier = filterSupplier ? item.supplier === filterSupplier : true;
    return matchesSearch && matchesCategory && matchesSupplier;
  });

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-light">Manage Inventory Items</h1>


      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search Items by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="form-control mb-2"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Filter by Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Groceries">Groceries</option>
        </select>
        <select
          className="form-control mb-2"
          value={filterSupplier}
          onChange={(e) => setFilterSupplier(e.target.value)}
        >
          <option value="">Filter by Supplier</option>
          <option value="Supplier A">Supplier A</option>
          <option value="Supplier B">Supplier B</option>
          <option value="Supplier C">Supplier C</option>
        </select>
      </div>


      <form onSubmit={handleAddOrUpdateItem} className="mb-4">
        <div className="row">
          <div className="col-md-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Supplier"
              value={newItem.supplier}
              onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-dark">
          {isUpdating ? 'Update Item' : 'Add Item'}
        </button>
      </form>


      <div className="row">
        {filteredItems.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p>
                <p className="card-text"><strong>Category:</strong> {item.category}</p>
                <p className="card-text"><strong>Supplier:</strong> {item.supplier}</p>
                <button className="btn btn-dark" onClick={() => handleEditItem(item)}>Edit</button>
                <button className="btn btn-dark" onClick={() => handleDeleteItem(item.name)} style={{marginLeft:'200px'}}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer autoClose={2000} /> 
    </div>
  );
};

export default ManageItems;
