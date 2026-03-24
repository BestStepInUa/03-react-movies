import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Add normalizetion
import 'modern-normalize'
import App from './components/App'

createRoot(document.getElementById('root') as HTMLDivElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
)

