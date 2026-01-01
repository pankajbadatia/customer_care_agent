'use client';

import { useState } from 'react';

const OPTIONS = [
  'Very poor',
  'Poor',
  'Okay',
  'Good',
  'Excellent',
];

export default function FeedbackForm() {
  const [rating, setRating] = useState<string | null>(null);

  return (
    <section>
      <h2
        style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          marginBottom: '0.75rem',
        }}
      >
        How would you rate it?
      </h2>

      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {OPTIONS.map((opt) => (
          <label
            key={opt}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
            }}
          >
            <input
              type="radio"
              name="rating"
              value={opt}
              checked={rating === opt}
              onChange={() => setRating(opt)}
            />
            {opt}
          </label>
        ))}
      </div>

      {rating && (
        <p style={{ marginTop: '0.75rem', color: '#475569' }}>
          Selected: <strong>{rating}</strong>
        </p>
      )}
    </section>
  );
}
