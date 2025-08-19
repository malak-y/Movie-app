import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails, clearMovie } from "../features/movieSlice";
import type { RootState, AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaArrowLeft, FaHeart, FaPlay } from "react-icons/fa";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { addFavorite, removeFavorite } from "../features/favoritesSlice";
const API_KEY = "3ce38d06cc5f12f46490e99d7965b977";

type CastMember = { 
  id: number; 
  name: string; 
  profile_path: string;
  character: string;
};

type Video = {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
};

type Review = {
  id: string;
  author: string;
  content: string;
  created_at: string;
};

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { movie, loading, error } = useSelector((state: RootState) => state.movie);
const favorites = useSelector((state: RootState) => state.favorites.movies);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingAdditional, setIsLoadingAdditional] = useState(true);
 const isFavorite = movie ? favorites.some((m) => m.id === movie.id) : false;
  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
      setIsLoadingAdditional(true);

      const fetchAllReviews = async () => {
        try {
          const [creditsRes, videosRes, firstReviewRes] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, { params: { api_key: API_KEY } }),
            axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, { params: { api_key: API_KEY } }),
            axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews`, { params: { api_key: API_KEY, language: "en-US", page: 1 } })
          ]);

          setCast(creditsRes.data.cast.slice(0, 10));
          setVideos(videosRes.data.results.slice(0, 5));
          let allReviews = firstReviewRes.data.results;
          const totalPages = firstReviewRes.data.total_pages;
          if (totalPages > 1) {
            const remainingPages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2); // pages 2..totalPages
            const remainingRequests = remainingPages.map(page =>
              axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews`, {
                params: { api_key: API_KEY, language: "en-US", page }
              })
            );

            const remainingResponses = await Promise.all(remainingRequests);
            remainingResponses.forEach(res => {
              allReviews = allReviews.concat(res.data.results);
            });
          }

          setReviews(allReviews);

        } catch (error) {
          console.error(error);
        } finally {
          setIsLoadingAdditional(false);
        }
      };

      fetchAllReviews();

      return () => {
        dispatch(clearMovie());
        setCast([]);
        setVideos([]);
        setReviews([]);
      };
    }
  }, [dispatch, id]);
const handleFavorite = () => {
    if (!movie) return;
    if (isFavorite) dispatch(removeFavorite(movie.id));
    else dispatch(addFavorite(movie));
  };
  if (loading)
    return (
      <div className="bg-gradient-to-b from-[#1a0c0d] to-[#2a1415] min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading movie details...</div>
      </div>
    );

  if (error) return <p className="text-red-400 p-6">{error}</p>;
  if (!movie) return <p className="text-white p-6">Movie not found</p>;

  const ratingDistribution = [40, 30, 15, 10, 5];
  const reviewsCount = Math.floor(movie.vote_count / 10) * 10 || 123; 

  const castSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="bg-[#2a1415] min-h-screen text-white">
      <div className="container mx-auto px-6 py-8">
        <Link
          to="/movies"
          className="inline-flex items-center gap-2 mb-8 text-red-400 hover:text-red-300 transition-colors"
        >
          <FaArrowLeft /> Back to Movies
        </Link>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/5">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="lg:w-3/5">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1 text-2xl font-bold">
                  <FaStar className="text-yellow-400" /> {movie.vote_average.toFixed(1)}
                </div>
                <span className="text-gray-400">{reviewsCount} reviews</span>
              </div>
              <div className="space-y-2 max-w-md">
                {ratingDistribution.map((percent, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 text-right">{5-index}★</div>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-600" 
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <div className="w-10 text-right text-gray-400">{percent}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-800 my-8"></div>
            {videos.length > 0 && (
              <a
                href={`https://www.youtube.com/watch?v=${videos[0].key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full mb-8 transition-colors"
              >
                <FaPlay /> Play Trailer
              </a>
            )}
            {!isLoadingAdditional && cast.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Cast</h2>
                <Slider {...castSliderSettings}>
                  {cast.map((person) => (
                    <div key={person.id} className="flex flex-col items-center px-2">
                      <img
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                            : "https://via.placeholder.com/100x150?text=No+Image"
                        }
                        alt={person.name}
                        className="w-24 h-32 object-cover rounded-lg"
                      />
                      <span className="text-center text-sm mt-1">{person.name}</span>
                      <span className="text-gray-300 text-xs">{person.character}</span>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
            {!isLoadingAdditional && videos.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Related Videos</h2>
                <div className="flex flex-wrap gap-3">
                  {videos.map((video) => (
                    <a
                      key={video.id}
                      href={`https://www.youtube.com/watch?v=${video.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 w-48"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                        alt={video.name}
                        className="w-48 h-28 object-cover rounded-lg"
                      />
                      <span className="text-center text-sm">{video.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed">
                {movie.overview || "No synopsis available."}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-sm text-gray-200 mb-1">Release Date</h3>
                <p>{movie.release_date}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-200 mb-1">Duration</h3>
                <p>{movie.runtime} min</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-200 mb-1">Rating</h3>
                <p className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" /> {movie.vote_average.toFixed(1)}/10
                </p>
              </div>
              <div>
                <h3 className="text-sm text-gray-200 mb-1">Genres</h3>
                <div className="flex flex-wrap gap-1">
                  {movie.genres.map((g) => (
                    <span key={g.id} className="text-sm">
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {!isLoadingAdditional && reviews.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-[#3a1e1f] p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-2">
                        <span className="font-semibold">{review.author}</span> - {new Date(review.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-gray-300 text-sm">{review.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={handleFavorite}
              className={`flex items-center gap-3 border px-6 py-3 rounded-full transition-colors ${
                isFavorite
                  ? "bg-red-500 text-white border-red-500"
                  : "border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              }`}
            >
              <FaHeart /> {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
