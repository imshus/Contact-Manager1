import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContactManager.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '', 
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    }
  });

  // Fetch contacts from API on component mount
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setContacts(response.data))
      .catch(error => console.error("Error fetching contacts:", error));
  }, []);

  // Add a contact
  const addContact = () => {
    axios.post(API_URL, newContact)
      .then(response => {
        setContacts([...contacts, { ...response.data, id: Date.now() }]);
        setNewContact({
          name: '', 
          username: '',
          email: '',
          address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            geo: { lat: '', lng: '' }
          }
        });
      })
      .catch(error => console.error("Error adding contact:", error));
  };

  // Update a contact
  const updateContact = (id) => {
    const updatedContact = contacts.find(contact => contact.id === id);
    axios.put(`${API_URL}/${id}`, updatedContact)
      .then(response => {
        setContacts(contacts.map(contact => 
          contact.id === id ? { ...response.data } : contact
        ));
      })
      .catch(error => console.error("Error updating contact:", error));
  };

  // Delete a contact
  const deleteContact = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setContacts(contacts.filter(contact => contact.id !== id));
      })
      .catch(error => console.error("Error deleting contact:", error));
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Contact Manager</h1>

      {/* Form to add new contact */}
      <div className="card p-4 mb-4">
        <h3>Add a New Contact</h3>
        <div className="form-row">
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="Name" 
            value={newContact.name} 
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} 
          />
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="Username" 
            value={newContact.username} 
            onChange={(e) => setNewContact({ ...newContact, username: e.target.value })} 
          />
          <input 
            type="email" 
            className="form-control mb-2" 
            placeholder="Email" 
            value={newContact.email} 
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })} 
          />
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="Street" 
            value={newContact.address.street} 
            onChange={(e) => setNewContact({ 
              ...newContact, 
              address: { ...newContact.address, street: e.target.value } 
            })} 
          />
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="Suite" 
            value={newContact.address.suite} 
            onChange={(e) => setNewContact({ 
              ...newContact, 
              address: { ...newContact.address, suite: e.target.value } 
            })} 
          />
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="City" 
            value={newContact.address.city} 
            onChange={(e) => setNewContact({ 
              ...newContact, 
              address: { ...newContact.address, city: e.target.value } 
            })} 
          />
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="Zipcode" 
            value={newContact.address.zipcode} 
            onChange={(e) => setNewContact({ 
              ...newContact, 
              address: { ...newContact.address, zipcode: e.target.value } 
            })} 
          />
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="Latitude" 
            value={newContact.address.geo.lat} 
            onChange={(e) => setNewContact({ 
              ...newContact, 
              address: { 
                ...newContact.address, 
                geo: { ...newContact.address.geo, lat: e.target.value } 
              } 
            })} 
          />
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="Longitude" 
            value={newContact.address.geo.lng} 
            onChange={(e) => setNewContact({ 
              ...newContact, 
              address: { 
                ...newContact.address, 
                geo: { ...newContact.address.geo, lng: e.target.value } 
              } 
            })} 
          />
          <button className="btn btn-primary btn-block mt-2" onClick={addContact}>Add Contact</button>
        </div>
      </div>

      {/* List of contacts */}
      <div className="row">
        {contacts.map(contact => (
          <div className="col-md-6 mb-3" key={contact.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{contact.name} ({contact.username})</h5>
                <p className="card-text">
                  <strong>Email:</strong> {contact.email}<br/>
                  <strong>Address:</strong> {contact.address.street}, {contact.address.suite}, {contact.address.city}, {contact.address.zipcode}<br/>
                  <strong>Geo:</strong> {contact.address.geo.lat}, {contact.address.geo.lng}
                </p>
                <button className="btn btn-warning mr-2" onClick={() => updateContact(contact.id)}>Update</button>
                <button className="btn btn-danger" onClick={() => deleteContact(contact.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactManager;
