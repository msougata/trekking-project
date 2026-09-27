import React, { useState } from "react";
import axios from "axios";
import "./ContactUs.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log("Submitting form data:", formData);
      
      // Add withCredentials option and make sure we're using the right URL
      const response = await axios.post('http://localhost:8080/api/contact', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Server response:", response.data);
      
      // Check if response is successful - if status is 200, we consider it a success
      // regardless of the response.data.success value
      if (response.status === 200) {
        setStatus({
          submitted: true,
          success: true,
          message: response.data?.message || "Thank you! Your message has been sent successfully."
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        // If server returned a response but not success
        setStatus({
          submitted: true,
          success: false,
          message: response.data?.message || "Something went wrong. Please try again later."
        });
      }
    } catch (error) {
      console.error("Error details:", error);
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
      }
      
      // Handle validation errors
      if (error.response?.status === 400) {
        // Check if we have validation errors
        const validationErrors = error.response.data;
        
        if (typeof validationErrors === 'object' && Object.keys(validationErrors).length > 0) {
          // Create a message from validation errors
          const errorMessage = Object.entries(validationErrors)
            .map(([field, message]) => `${message}`)
            .join(', ');
            
          setStatus({
            submitted: true,
            success: false,
            message: errorMessage
          });
        } else if (validationErrors.message) {
          // Direct message from server
          setStatus({
            submitted: true,
            success: false,
            message: validationErrors.message
          });
        } else {
          // Generic bad request message
          setStatus({
            submitted: true,
            success: false,
            message: "Please check your form data and try again."
          });
        }
      } else {
        // Generic server error
        setStatus({
          submitted: true,
          success: false,
          message: "Failed to send your message. Please try again later."
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="heading">
        <h2 className="text-center mb-4">Contact Us</h2>
      </div>

      <div className="row">
        {/* Contact Form */}
        <div className="col-md-6">
          {status.submitted && (
            <div className={`alert ${status.success ? "alert-success" : "alert-danger"} mb-4`}>
              {status.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name"
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input 
                type="text" 
                className="form-control" 
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea 
                className="form-control" 
                id="message" 
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="col-md-6">
          <h5>Our Address</h5>
          <p>
            MyTrek Headquarters<br />
            123 Adventure Road<br />
            Kolkata, WB 700001<br />
            India
          </p>

          <p><strong>Email:</strong> support@mytrek.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>

          {/* Google Map */}
          <div className="ratio ratio-4x3 mt-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.9272583396947!2d88.363895!3d22.572646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277a351b6e0df%3A0xceb9a73d9ef11b3a!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1625156113573"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
