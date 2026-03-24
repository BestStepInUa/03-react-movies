import { FallingLines } from 'react-loader-spinner'
import css from './Loader.module.css'

export default function Loader() {
	return (
		<div className={css.wrapper}>
			<FallingLines
				color='#084298'
				width='100'
				visible={true}
				ariaLabel='falling-circles-loading'
			/>
			<p className={css.text}>Loading movies, please wait...</p>
		</div>
	)
}

