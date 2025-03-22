import React, { useState } from 'react';
import { useSelector } from 'react-redux';
const GetTechHelp = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  return (
    <div className="get-tech-help" style={{backgroundColor , maxWidth:"100%", height:"89vh" , boxSizing:"border-box", padding:"0" , margin:"0" , display:"flex" , alignItems:"center", justifyContent:"center" }}>
    
      
      <section className="help-options">
      <h1  style={{margin:"0" , color:textColor}}>Get Tech Help</h1>
        <ul>
          <li>
            <button onClick={() => window.open('https://www.example.com/faq', '_blank')}>
              View FAQs
            </button>
          </li>
          <li>
            <button onClick={() => window.open('https://www.example.com/support', '_blank')}>
              Visit Support Center
            </button>
          </li>
          <li>
            <button onClick={toggleContactForm}>
              Contact Us
            </button>
          </li>
        </ul>
      </section>

      {showContactForm && (
        <section className="contact-form">
          <h2 style={{color:textColor , margin:"0"}}>Contact Us</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission
              alert('Message sent! We will get back to you soon.');
            }}
          >
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <label>
              Message:
              <textarea name="message" rows="4" required></textarea>
            </label>
            <button type="submit">Send Message</button>
            <button type="button" onClick={toggleContactForm}>
              Cancel
            </button>
          </form>
        </section>
      )}

      <style jsx>{`
      
        .help-options ul {
          list-style-type: none;
          padding: 0;
        }
        .help-options li {
          margin-bottom: 10px;
        }
        .help-options button {
          padding: 10px;
          font-size: 16px;
          cursor: pointer;
        }
        .contact-form {
          margin-top: 20px;
          padding: 10px;
          border-top: 1px solid #ddd;
        }
        .contact-form form {
          display: flex;
          flex-direction: column;
        }
        .contact-form label {
          margin-bottom: 10px;
        }
        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .contact-form button {
          margin-top: 10px;
          padding: 10px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default GetTechHelp;
