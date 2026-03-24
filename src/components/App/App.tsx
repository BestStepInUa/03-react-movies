// import { fetchMovies } from '@/services/movieService'

import toast, { Toaster } from 'react-hot-toast'
import SearchBar from '../SearchBar'
import { useEffect, useState } from 'react'
import type { Movie } from '@/types/movie'
import { fetchMovies } from '@/services/movieService'
import css from './App.module.css'
import Loader from '../Loader'
import ErrorMessage from '../ErrorMessage'

export default function App() {
	const [movies, setMovies] = useState<Movie[]>([])
	const [query, setQuery] = useState<string>('')
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	const handleSubmit = (query: string) => {
		setQuery(query)
	}

	const handleSearch = async (query: string) => {
		try {
			setIsLoading(true)
			setIsError(false)

			const movies = await fetchMovies(query)

			if (movies.length === 0)
				toast.error('No movies found for your request.', { id: 'unique-toast' })
			else toast.success('Successfully loaded movies.', { id: 'unique-toast' })

			setMovies(movies)
		} catch {
			setIsError(true)
			toast.error('Whoops, something went wrong! Please try again!', { id: 'unique-toast' })
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (!query.trim()) return
		void handleSearch(query)
	}, [query])

	return (
		<div className={css.app}>
			<SearchBar onSubmit={handleSubmit} />
			{isLoading && <Loader />}
			{isError && <ErrorMessage />}
			{movies.length > 0 && (
				<ul>
					{movies.map((movie) => (
						<li key={movie.id}>{movie.title}</li>
					))}
				</ul>
			)}
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

