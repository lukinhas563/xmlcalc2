import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'urql'
import App from './App.tsx'
import client from './shared/lib/graphql.ts'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <Provider value={client}>
        <StrictMode>
            <App />
        </StrictMode>
    </Provider>,
)
