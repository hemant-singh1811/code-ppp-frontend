import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './stylesheet/index.css';
import { Provider } from 'react-redux';
import { store } from './store/app/store';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename={'/'}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>
);
