"use client";

import { useState } from "react";
import { submitReview } from "@/actions/addReview";

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("rating", rating.toString());
    formData.append("comment", comment);
    formData.append("userName", userName);

    try {
      await submitReview(formData);
      setComment("");
      setUserName("");
      setRating(5);
    } catch (e) {
      console.error(e);
      alert("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <label style={{ display: 'block' }}>Rating</label>
          <select value={rating} onChange={e => setRating(Number(e.target.value))} style={{ padding: '0.5rem', width: '100%' }}>
            <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
            <option value="4">⭐⭐⭐⭐ (4/5)</option>
            <option value="3">⭐⭐⭐ (3/5)</option>
            <option value="2">⭐⭐ (2/5)</option>
            <option value="1">⭐ (1/5)</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block' }}>Name</label>
          <input 
            type="text" 
            required 
            value={userName} 
            onChange={e => setUserName(e.target.value)} 
            placeholder="Jane Doe"
            style={{ padding: '0.5rem', width: '100%', border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <label style={{ display: 'block' }}>Review</label>
          <textarea 
            required 
            rows={4} 
            value={comment} 
            onChange={e => setComment(e.target.value)} 
            placeholder="What did you think of this piece?"
            style={{ padding: '0.5rem', width: '100%', border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
