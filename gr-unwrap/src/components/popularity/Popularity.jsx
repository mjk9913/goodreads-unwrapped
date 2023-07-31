import React, { useEffect, useState } from 'react';
import './popularity.css';

export const Popularity = () => {
    const [percentPopular, setPercentPopular] = useState(0);
    const [books, setBooks] = useState([]);

    const handleScrape = () => {
        // Send the URL to the backend
        fetch('http://127.0.0.1:5000/scrape', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(response => response.json())
        .then(data => {
            // Handle the data returned from the backend (e.g., store it in state)
            setBooks(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };
    async function isPopular(isbn) {
        const apiKey = '9kHGlyciKOvw90GYdGQs3TidMYQzAKu3';
        const apiUrl = `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?isbn=${isbn}&api_key=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data['results'].length > 0;
        } catch (error) {
            console.error('Error fetching data:', error);
            return false;
        }
    }

    function countPopularBooks() {
        
        const popular = [];

        for (let i = 0; i < books.length; i++) {
            if (isPopular(books[i]['isbn'])) {
                popular.push(books[i]);
            }
        }
        return popular;
    }

    useEffect(() => {
        // This effect runs only once when the component is first rendered
        handleScrape(); // Call the handleScrape function immediately
      }, []); // The dependency array is empty, so it runs only once

    useEffect(() => {
        // This effect runs whenever the books state changes
        if (books.length > 0) {
            const popularBooks = countPopularBooks();
            const percentage = (popularBooks.length / books.length) * 100 || 0;
            setPercentPopular(percentage.toFixed(2)); // Set the percentage to two decimal places
        }
    }, [books]); 
    
    useEffect(() => {
    const popularBooks = countPopularBooks();
    const percentage = (popularBooks.length / books.length) * 100 || 0;
    setPercentPopular(percentage.toFixed(2)); // Set the percentage to two decimal places
    }, [books]); // Add books as a dependency for the second useEffect
    

    return (
        <>
        <div className="popularity">
            <div className="title1">How popular are the books you read?</div>
            <div className="percent-popular">
                {percentPopular}% of your books are on the New York Times Bestseller List!
            </div>
        </div>
        </>
    );
};

export default Popularity;
