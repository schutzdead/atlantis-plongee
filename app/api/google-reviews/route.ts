import { NextResponse } from "next/server";

// Place ID extrait du lien Google Maps
// https://maps.app.goo.gl/pQwNs2tWqALWus5s9 -> Atlantis Plongée
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
  profile_photo_url?: string;
}

export interface PlaceDetails {
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    console.error("GOOGLE_PLACES_API_KEY non configurée");
    return NextResponse.json(
      { error: "Configuration manquante", reviews: [] },
      { status: 500 }
    );
  }

  if (!PLACE_ID) {
    console.error("GOOGLE_PLACE_ID non configuré");
    return NextResponse.json(
      { error: "Place ID manquant", reviews: [] },
      { status: 500 }
    );
  }

  try {
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/details/json"
    );
    url.searchParams.set("place_id", PLACE_ID);
    url.searchParams.set("fields", "rating,user_ratings_total,reviews");
    url.searchParams.set("reviews_sort", "newest");
    url.searchParams.set("language", "fr");
    url.searchParams.set("key", apiKey);

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache 1 heure
    });

    const data = await response.json();

    if (data.status !== "OK") {
      console.error("Erreur Google Places API:", data.status, data.error_message);
      return NextResponse.json(
        { error: data.error_message || data.status, reviews: [] },
        { status: 400 }
      );
    }

    const result = data.result as PlaceDetails;

    // Filtrer les avis 4+ étoiles et avec du texte
    const filteredReviews = (result.reviews || [])
      .filter((review) => review.rating >= 4 && review.text.length > 20)
      .map((review) => ({
        name: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.time,
        relativeTime: review.relative_time_description,
        photoUrl: review.profile_photo_url,
      }));

    return NextResponse.json({
      rating: result.rating,
      totalReviews: result.user_ratings_total,
      reviews: filteredReviews,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des avis:", error);
    return NextResponse.json(
      { error: "Erreur serveur", reviews: [] },
      { status: 500 }
    );
  }
}
