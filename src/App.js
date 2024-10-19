import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import emailjs from '@emailjs/browser';
import './App.css';
import ThankYouPage from './ThankYouPage';  // Import the new component

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);  // New state to track submission

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_mail: 'harinarayan947255@gmail.com',
      to_name: 'Hari Narayan',
    };

    const publicKey = 'jq3d3_sXvyBVpWyre';
    const serviceId = 'service_k72ljb3';
    const templateId = 'template_ajcnybf';

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(
        () => {
          console.log('SUCCESS!');
          setName('');      // Clear form fields
          setEmail('');
          setMessage('');
          setIsSubmitted(true);  // Show thank-you page on success
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  // Conditional rendering: Show ThankYouPage if isSubmitted is true
  if (isSubmitted) {
    return <ThankYouPage />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 hh">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <h2 className="text-center fs-3 my-4">Contact Form</h2>
            <Form onSubmit={sendEmail}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name"
                  name="from_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Your Email"
                  name="from_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
