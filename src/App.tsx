import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '@/shared/components/PrivateRoute';
import AppSection from '@/shared/Layout';

/* Modules */
const Home = React.lazy(() => import('./modules/Home'));
const Login = React.lazy(() => import('./modules/Authentication/Login'));
const Signup = React.lazy(() => import('./modules/Authentication/Signup'));
const Products = React.lazy(() => import('./modules/Products'));
/* Modules */

const App = () => (
  <Routes>
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<AppSection />}>
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/*" element={<Products />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Route>
    </Route>
    <Route path="*" element={<>Error</>} />
  </Routes >
);

export default App;
