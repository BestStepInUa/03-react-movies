import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { fetchMovies } from '@/services/movieService'
import type { Movie } from '@/types/movie'
import SearchBar from '../SearchBar'
import Loader from '../Loader'
import ErrorMessage from '../ErrorMessage'
import MovieGrid from '../MovieGrid'
import MovieModal from '../MovieModal'
import css from './App.module.css'

export default function App() {
	const [movies, setMovies] = useState<Movie[]>([])
	const [activeMovie, setActiveMovie] = useState<Movie>()
	const [query, setQuery] = useState<string>('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	const handleSubmit = (query: string) => {
		setMovies([])
		setQuery(query)
	}

	const handleSearch = async (query: string, signal?: AbortSignal) => {
		try {
			setIsLoading(true)
			setIsError(false)

			const movies = await fetchMovies(query, signal)

			if (movies.length === 0)
				toast.error('No movies found for your request.', { id: 'unique-toast' })
			else toast.success('Successfully loaded movies.', { id: 'unique-toast' })

			setMovies(movies)
		} catch (error) {
			const isCanceled =
				error instanceof Error &&
				(error.name === 'CanceledError' || (error as { code?: string }).code === 'ERR_CANCELED')

			if (isCanceled) return

			setIsError(true)
			toast.error('Whoops, something went wrong! Please try again!', { id: 'unique-toast' })
		} finally {
			setIsLoading(false)
		}
	}

	const openModal = (movie: Movie) => {
		setActiveMovie(movie)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setActiveMovie(undefined)
		setIsModalOpen(false)
	}

	useEffect(() => {
		if (!query.trim()) return

		const controller = new AbortController()
		void handleSearch(query, controller.signal)

		return () => {
			controller.abort()
		}
	}, [query])

	const hasMovies = movies.length > 0

	return (
		<div className={css.app}>
			<SearchBar onSubmit={handleSubmit} />

			{isLoading && <Loader />}
			{isError && <ErrorMessage />}
			{hasMovies && <MovieGrid movies={movies} onSelect={openModal} />}
			{isModalOpen && activeMovie && <MovieModal movie={activeMovie} onClose={closeModal} />}
			<div>
				<Toaster
					position='top-center'
					reverseOrder={false}
					toastOptions={{
						success: {
							style: {
								background: '#6bcb77',
								color: 'white',
							},
						},
						error: {
							style: {
								background: '#ff6b6b',
								color: 'white',
							},
						},
					}}
				/>
			</div>
		</div>
	)
}

