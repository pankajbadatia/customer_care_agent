import { FeedbackCategory, FeedbackRating } from './types';

/**
 * Rating options shown in the UI
 * (CSAT-style scale)
 */
export const RATING_OPTIONS: Array<{
  value: FeedbackRating;
  label: string;
}> = [
  { value: 1, label: 'Very poor' },
  { value: 2, label: 'Poor' },
  { value: 3, label: 'Okay' },
  { value: 4, label: 'Good' },
  { value: 5, label: 'Excellent' },
];

/**
 * Feedback categories shown in dropdown
 */
export const CATEGORY_OPTIONS: Array<{
  value: FeedbackCategory;
  label: string;
}> = [
  { value: 'chatbot', label: 'Chatbot response' },
  { value: 'ticket_resolution', label: 'Ticket resolution' },
  { value: 'response_quality', label: 'Response quality' },
  { value: 'accuracy', label: 'Accuracy' },
  { value: 'speed', label: 'Speed' },
  { value: 'other', label: 'Other' },
];
