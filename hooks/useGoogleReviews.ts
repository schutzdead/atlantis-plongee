import { useState, useEffect } from "react";

export interface GoogleReview {
  name: string;
  rating: number;
  text: string;
  time: number;
  relativeTime: string;
  photoUrl?: string;
}

interface GoogleReviewsResponse {
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
  error?: string;
}

interface UseGoogleReviewsResult {
  reviews: GoogleReview[];
  rating: number;
  totalReviews: number;
  isLoading: boolean;
  error: string | null;
}

export function useGoogleReviews(): UseGoogleReviewsResult {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/google-reviews");
        const data: GoogleReviewsResponse = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setReviews(data.reviews);
          setRating(data.rating);
          setTotalReviews(data.totalReviews);
        }
      } catch (err) {
        setError("Impossible de charger les avis");
        console.error("Erreur chargement avis:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return { reviews, rating, totalReviews, isLoading, error };
}
