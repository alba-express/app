import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './config/route-config';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;