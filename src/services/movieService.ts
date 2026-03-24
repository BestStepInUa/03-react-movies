import axios from 'axios'
import type { Movie } from '@/types/movie'

interface MoviesHttpResponse {
	results: Movie[]
}

const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL.replace(/\/$/, ''),
	params: {
		include_adult: false,
		language: 'en-US',
		page: 1,
	},
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
	},
})

export const fetchMovies = async (query: string): Promise<Movie[]> => {
	const { data } = await api.get<MoviesHttpResponse>('', {
		params: {
			query,
		},
	})
	return data.results
}

