import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import "./styles/global.scss";
import "./styles/fonts.scss";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1
    },
  },
});
createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
)
