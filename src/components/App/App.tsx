import { fetchMovies } from '@/services/movieService'

export default function App() {
	fetchMovies('love')
	return <div>App</div>
}

