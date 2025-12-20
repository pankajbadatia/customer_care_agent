'use client';

import React, { useState } from 'react';
import Button from '../../shared-ui/Button';
import { submitFeedback } from './actions';
import {
  FeedbackCategory,
  FeedbackRating,
  FeedbackPayload,
} from './types';
import { RATING_OPTIONS, CATEGORY_OPTIONS } from './constants';

/**
 * Feedback Page
 *
 * Purpose:
 * - Collect user feedback on chatbot / ticket experience
 * - Feed ML retraining + agent correction loops
 * - Track quality vs cost vs latency tradeoffs
 */
export default function FeedbackPage() {
  const [rating, setRating] = useState<FeedbackRating | null>(null);
  const [category, setCategory] = useState<FeedbackCategory>('chatbot');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!rating) {
      setError('Please select a rating');
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload: FeedbackPayload = {
      rating,
      category,
      comment: comment.trim() || undefined,
      timestamp: Date.now(),
    };

    try {
      await submitFeedback(payload);
      setSuccess(true);
      setComment('');
      setRating(null);
    } catch (err) {
      setError((err as Error).message || 'Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      style={{
        padding: '1.5rem',
        maxWidth: '640px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
        Share Your Feedback
      </h1>

      <p style={{ marginTop: '0.5rem', color: '#475569' }}>
        Your feedback helps us improve response quality, accuracy, and speed.
      </p>

      {/* Success */}
      {success && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            backgroundColor: '#dcfce7',
            color: '#166534',
          }}
        >
          Thank you! Your feedback has been submitted.
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            backgroundColor: '#fee2e2',
            color: '#991b1b',
          }}
        >
          {error}
        </div>
      )}

      {/* Category */}
      <section style={{ marginTop: '1.5rem' }}>
        <label style={{ fontWeight: 500 }}>What is this feedback about?</label>
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as FeedbackCategory)
          }
          style={{
            display: 'block',
            marginTop: '0.5rem',
            padding: '0.5rem',
            width: '100%',
          }}
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </section>

      {/* Rating */}
      <section style={{ marginTop: '1.5rem' }}>
        <label style={{ fontWeight: 500 }}>How would you rate it?</label>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          {RATING_OPTIONS.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRating(r.value)}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                border:
                  rating === r.value
                    ? '2px solid #2563eb'
                    : '1px solid #cbd5f5',
                backgroundColor:
                  rating === r.value ? '#eff6ff' : '#ffffff',
                cursor: 'pointer',
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </section>

      {/* Comment */}
      <section style={{ marginTop: '1.5rem' }}>
        <label style={{ fontWeight: 500 }}>
          Additional comments (optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Tell us what worked well or what went wrong…"
          style={{
            display: 'block',
            marginTop: '0.5rem',
            padding: '0.5rem',
            width: '100%',
          }}
        />
      </section>

      {/* Submit */}
      <section style={{ marginTop: '1.5rem' }}>
        <Button
          onClick={handleSubmit}
          loading={submitting}
        >
          Submit Feedback
        </Button>
      </section>
    </main>
  );
}
