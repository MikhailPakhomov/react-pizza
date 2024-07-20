import React, { Profiler } from 'react';
import ReactDOM from 'react-dom/client';
import { store}from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement) ;

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      ,
    </BrowserRouter>
    ,
  </Provider>,
);
