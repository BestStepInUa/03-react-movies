import type { Movie } from '@/types/movie'
import css from './MovieModal.module.css'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'

interface MovieModalProps {
	movie: Movie
	onClose: () => void
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
	const { title, backdrop_path, release_date, overview, vote_average } = movie

	const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose()
		}
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.body.style.overflow = ''
		}
	}, [onClose])

	return createPortal(
		<div className={css.backdrop} role='dialog' aria-modal='true' onClick={handleBackdropClick}>
			<div className={css.modal}>
				<button className={css.closeButton} aria-label='Close modal' onClick={onClose}>
					&times;
				</button>
				<img
					src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
					alt={title}
					className={css.image}
				/>
				<div className={css.content}>
					<h2>{title}</h2>
					<p>{overview}</p>
					<p>
						<strong>Release Date:</strong> {release_date}
					</p>
					<p>
						<strong>Rating:</strong> {vote_average}/10
					</p>
				</div>
			</div>
		</div>,
		document.getElementById('movie-modal') as HTMLDivElement,
	)
}

