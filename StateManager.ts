import axios from 'axios';
const API_KEY = '125b27dc67370fdb108916a0a7e7f110';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}
export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export const movieAPI = {
  getTrending: async () => {
    const res = await axios.get(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    return res.data;
  },
  getComming: async ({ pageParam }) => {
    console.log(pageParam);
    const res = await axios.get(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageParam}`
    );
    return res.data;
  },
  getNowPlaying: async () => {
    const result = await axios.get(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    return result.data;
  },
  searchMovie: async ({ queryKey }) => {
    const [_, query] = queryKey;
    const result = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
    );
    return result.data;
  },
  detail: async ({ queryKey }) => {
    const [_, id] = queryKey;
    const result = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
    );
    return result.data;
  },
};

export const tvAPI = {
  getTrending: async () => {
    const res = await axios.get(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`
    );
    return res.data;
  },
  getNowPlaying: async () => {
    const result = await axios.get(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}`
    );
    return result.data;
  },
  getRated: async () => {
    const result = await axios.get(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}`
    );
    return result.data;
  },
  searchTV: async ({ queryKey }) => {
    const [_, query] = queryKey;
    const result = await axios.get(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
    );
    return result.data;
  },
  detail: async ({ queryKey }) => {
    const [_, id] = queryKey;
    const result = await axios.get(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos`
    );
    return result.data;
  },
};
