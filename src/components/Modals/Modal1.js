import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';

function ModalScreen() {
  const showModal = true;
  const [loader, setLoader] = useState(true);
  const [initialItems, setInitialItems] = useState([]);
  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigateToPage = (url) => {
    window.location.href = url;
  };

  console.log(initialItems)

  const getData = () => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4';
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    axios.get('https://api.dev.pastorsline.com/api/contacts.json?companyId=171&query&page=2&countryId=226', { headers })
      .then((response) => {
        // Handle successful response
        console.log('Fetched Data:', response.data);
        const contactsArray = Object.values(response.data.contacts);
        setInitialItems(contactsArray);
        setItems(contactsArray); // Set items as an array
        setLoader(false);
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
        setLoader(false);
      });
  }
  

  useEffect(() => {
    getData();
  }, []);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredItems = initialItems.filter((item) => {
      return (
        item.first_name.toLowerCase().includes(searchTerm) ||
        item.phone_number.includes(searchTerm) ||  // Use correct property names
        item.country_id.toString().includes(searchTerm) // Use correct property names and convert to string
      );
    })

    setItems(filteredItems);
  };

  return (
    <div className="container">
      <Modal show={showModal} backdrop="static">
        <Modal.Body>
          <div>
            <h2>All Countries</h2>
            <div className="mb-1 mt-4">
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            {loader ? (
              <div className='d-flex justify-content-center align-items-center'>
                <p>Loading...</p>
              </div>
            ) : (
              <Scrollbars style={{ width: '100%', height: 300, marginTop: 10, marginBottom: 30 }}>
                <div className="list-group list-group-flush">
                  {items.map((item) => {
                    console.log('Mapping Item:', item); // Log the item being mapped
                    return (
                      <div key={item.id} className="list-group-item list-group-item-action" onClick={() => { console.log("clicked", item.id) }}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div style={{maxWidth:10}}>
                            {item.first_name}
                          </div>
                          <div style={{maxWidth:10}}>
                            {item.phone_number}
                          </div>
                          <div style={{maxWidth:10}}>
                            {item.country_id}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Scrollbars>
            )}
          </div>
          <div className="btn-group" role="group">
            <Button variant="primary mr-2">All Contacts</Button>
            <Button onClick={() => navigateToPage('/uscontacts')} variant="secondary mr-2">US Contacts</Button>
            <Button onClick={() => navigateToPage('/')} variant="danger">
              Close
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Form.Check
            type="checkbox"
            label="Only even"
            checked={isChecked}
            onChange={() => { setIsChecked(!isChecked); }}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalScreen;
