import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reviews')
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>User Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review._id}>
            {review.service} - Rating: {review.rating}/5
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
