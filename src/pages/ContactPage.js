import React from 'react';
import Footer from '../components/Footer';

function Contact() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container my-5 flex-grow-1 text-center">
        <h2 className="mb-4">📞 Contact Us</h2>
        <p className="lead mb-4">We'd love to hear from you! Reach out through any of the methods below:</p>

        <div className="card mx-auto shadow p-4" style={{ maxWidth: "500px" }}>
          <h5 className="mb-3">📬 Email</h5>
          <p>support@recipefinder.com</p>

          <h5 className="mt-4 mb-3">📞 Toll-Free Number</h5>
          <p>7900141523</p>

          <h5 className="mt-4 mb-3">⏰ Support Hours</h5>
          <p>Monday - Saturday | 10:00 AM - 6:00 PM</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
