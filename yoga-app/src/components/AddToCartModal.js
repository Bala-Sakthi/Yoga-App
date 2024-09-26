import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import BasicButton from './BasicButton';
import { useNavigate } from 'react-router-dom';
import image from '../../src/assests/images/quality.png';

const SideModal = ({ show, onClose, cartItems }) => {
  const navigate = useNavigate();
  if (!show) return null;

  const navigateToProfile = (path) => {
    navigate('/my-profile', { state: { path } });
  };

  return (
    <div className="custom-modal shadow border border-secondary rounded-0">
      <div className="modal-content">
        {/* Fixed Modal Header */}
        <div className="modal-header" style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
          <h5 className="modal-title">Cart Details</h5>
          <button className="close" onClick={onClose}>
            &times;
          </button>
        </div>
        <hr className="mb-3" />

        {/* Scrollable container for cart items, RS Promise, and warranty text */}
        <div className="modal-body" >
          {/* Cart items */}
          <div className="cart-items-container" style={{ marginBottom: '20px' }}>
            {cartItems.slice(0, 3).map((item, index) => (
              <div key={index} className="cart-item mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6>{item.type}</h6>
                    {item.issue && <p className="text-secondary">{item.issue}</p>}
                    {item.model && <p className="text-secondary">{item.model}</p>}
                  </div>
                  <span className="text-success">
                    <h6>Added</h6>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* View Cart Button */}
          <BasicButton
            className="bg-main w-100 px-3 py-1 mt-4"
            label="View Cart"
            onClick={() => navigateToProfile('cart')}
          />

          {/* RS Promise section */}
          <div className="mt-4">
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={9} className="text-left">
                    <Card.Title>RS Promise</Card.Title>
                    <Card.Text style={{ fontSize: '15px' }}>
                      <i className="bi bi-check2"></i> Verified Professionals
                    </Card.Text>
                    <Card.Text style={{ fontSize: '15px' }}>
                      <i className="bi bi-check2"></i> Hassle Free Booking
                    </Card.Text>
                    <Card.Text style={{ fontSize: '15px' }}>
                      <i className="bi bi-check2"></i> Transparent Pricing
                    </Card.Text>
                  </Col>
                  <Col xs={3} className="text-right">
                    <img
                      src={image}
                      alt="Quality Assured"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                      }}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>

          {/* Warranty information */}
          <div className="mt-3 mx-3">
            <h6 className="mb-2">How is warranty period calculated?</h6>
            <ul>
              <li>180 days warranty on all repairs</li>
              <li>
                5 days warranty on servicing and minor repairs not requiring any spare part
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideModal;
