import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Spinner from './components/Spinner';

const EditThread = lazy(() => import('./routes/EditThread'));
const Home = lazy(() => import('./routes/Home'));
const Join = lazy(() => import('./routes/Join'));
const Login = lazy(() => import('./routes/Login'));
const NotFound = lazy(() => import('./routes/NotFound'));
const Thread = lazy(() => import('./routes/Thread'));
const Write = lazy(() => import('./routes/Write'));
const UserProfile = lazy(() => import('./routes/UserProfile'));
const ChangePassword = lazy(() => import('./routes/ChangePassword'));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/write" element={<Write />} />
          <Route path="/user/:userid" element={<UserProfile />} />
          <Route path="/user/change-password" element={<ChangePassword />} />
          <Route path="/thread/:threadid" element={<Thread />} />
          <Route path="/thread/:threadid/edit" element={<EditThread />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
