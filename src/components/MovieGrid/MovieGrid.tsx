import type { Movie } from '@/types/movie'
import css from './MovieGrid.module.css'

interface MovieGridProps {
	movies: Movie[]
	onSelect: (idx: number) => void
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
	return (
		<ul className={css.grid}>
			{movies.map(({ id, title, poster_path }, idx) => (
				<li key={id} onClick={() => onSelect(idx)}>
					<div className={css.card}>
						<img
							className={css.image}
							src={`https://image.tmdb.org/t/p/w500${poster_path}`}
							alt={title}
							loading='lazy'
						/>
						<h2 className={css.title}>{title}</h2>
					</div>
				</li>
			))}
		</ul>
	)
}

