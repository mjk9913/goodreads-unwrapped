import React, { useState } from 'react';
import './home.css';

function InputURL() {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/scrape', {
        method: 'POST', // You can change this to the appropriate HTTP method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }), // Send the URL in the request body
      });

      if (response.ok) {
        console.log('Server request successful');
        // You can perform additional actions after a successful request here
      } else {
        console.error('Server request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          className="input-field"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Goodreads Shelf URL"
        />
      </label>
      <button type="submit" className="submit-button">
        Analyze Bookshelf
      </button>
    </form>
  );
}

export const Home = () => {
  return (
    <div className="title">
      Goodreads Unwrapped
      <InputURL />
    </div>
  );
};

export default Home;
