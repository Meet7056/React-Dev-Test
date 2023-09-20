import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalScreen() {
  // show modal using this boolean
  const showModal = true;

  // function to navigate a page to another page
  const navigateToPage = (url) => {
    window.location.href = url;
  };
  
  // check functionality
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="container">
      <Modal show={showModal} backdrop="static">

        <Modal.Body>

          {/* 3 buttons */}
          <div className="btn-group" role="group">
            <Button onClick={() => navigateToPage('/allcontacts')} variant="primary mr-2">All Contacts</Button>
            <Button variant="secondary mr-2">US Contacts</Button>
            <Button onClick={() => navigateToPage('/')} variant="danger">
              Close
            </Button>
          </div>
        </Modal.Body>

        {/* footer */}
        <Modal.Footer className="d-flex justify-content-between">
          <Form.Check
            type="checkbox"
            label="Only even"
            checked={isChecked}
            onChange={()=>{setIsChecked(!isChecked);}}
          />
        </Modal.Footer>

      </Modal>
    </div>
  );
}

export default ModalScreen;
