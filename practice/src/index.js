import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        staleTime: 30000, // 데이터가 5초 동안 신선하다고 간주
        cacheTime: 50000, // 데이터가 10초 동안 캐시됨
        retry: 1, // 실패 시 1번만 재시도
        refetchOnWindowFocus: false, 
      },
    },
  }
);

root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
