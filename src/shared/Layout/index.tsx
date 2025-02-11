import React, { Suspense } from 'react';
import UserMenu from './UserMenu';
import ErrorBoundary from '../components/ErrorBoundary';
import Loading from '../components/Loading';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => (
  <>
    <header className="border-b">
      <div className="container w-full mx-auto flex h-16 items-center justify-between">
        <h1 className="text-2xl font-bold">Product management</h1>
        <UserMenu />
      </div>
    </header>
    <main className="container py-10 max-w-5xl mx-auto">
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </main>
  </>
);

export default Layout;
