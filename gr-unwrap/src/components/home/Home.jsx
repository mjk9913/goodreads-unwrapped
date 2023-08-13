import React, { useState } from 'react';
import './home.css';

function InputURL({ onFormSubmit }) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        var books = await response.json(); // Parse the JSON response
        console.log('Server response:', books); 
        onFormSubmit(books); // Notify parent component (App) about the successful response
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

export const Home = ({ onFormSubmit }) => {
  return (
    <div className="title">
      Goodreads Unwrapped
      <InputURL onFormSubmit={onFormSubmit} />
    </div>
  );
};

export default Home;
