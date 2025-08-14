import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProviderRoot } from './components/ui/provider.tsx'
import { Provider } from 'react-redux'
import "react-datepicker/dist/react-datepicker.css";
import { store } from '../feature/store/store.ts'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <ChakraProviderRoot>
      <App />
      <Toaster />
    </ChakraProviderRoot>
    </Provider>
  </StrictMode>,
)
