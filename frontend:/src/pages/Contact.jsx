import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you。');
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <div className="contact-header">
        <div className="contact-header-content">
          <h1>Contact us</h1>
        </div>
      </div>

      {/* Content */}
      <div className="contact-content">
        {/* Contact Info Cards */}
        <div className="contact-info-grid">
          <div className="contact-info-card">
            <div className="contact-icon">📞</div>
            <h3>Phone</h3>
            <p>123-456-7890</p>
          </div>
          
          <div className="contact-info-card">
            <div className="contact-icon">📧</div>
            <h3>Email</h3>
            <p>hellopetpal@company.com</p>
            <p>infopetpal@company.com</p>
          </div>
          
          <div className="contact-info-card">
            <div className="contact-icon">⏰</div>
            <h3>Business Hour</h3>
            <p>Mon - Fri: 9am - 8pm</p>
            <p>Sat: 9am - 4pm</p>
          </div>
          
        </div>

        {/* Contact Form */}
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="6"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>

        {/* Social Media */}
        <div className="social-media-section">
          <p>Follow us</p>
          <div className="social-links">
            <div className="social-link">
              Instagram: @petpal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}