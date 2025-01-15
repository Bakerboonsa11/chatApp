import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import App from './App';
import DashBoard from '../src/Components/dashboard'
import { Provider } from 'react-redux'; // Import Provider
import store from './states/store'; // Import your Redux store

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path:'/dashboard',
    element:<DashBoard/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap your RouterProvider with Provider */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
