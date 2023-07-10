import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Spinner from './components/Spinner';
import { ROUTER_PATH } from './constants/path';

const EditThread = lazy(() => import('./pages/EditThread'));
const Home = lazy(() => import('./pages/Home'));
const Join = lazy(() => import('./pages/Join'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Thread = lazy(() => import('./pages/Thread'));
const Write = lazy(() => import('./pages/Write'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const ChangePassword = lazy(() => import('./pages/ChangePassword'));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path={ROUTER_PATH.HOME} element={<Home />} />
          <Route path={ROUTER_PATH.JOIN} element={<Join />} />
          <Route path={ROUTER_PATH.LOGIN} element={<Login />} />
          <Route path={ROUTER_PATH.WRITE} element={<Write />} />
          <Route path={ROUTER_PATH.USER}>
            <Route path={ROUTER_PATH.USER_ID} element={<UserProfile />} />
            <Route path={ROUTER_PATH.USER_PASSWORD} element={<ChangePassword />} />
          </Route>
          <Route path={ROUTER_PATH.THREAD}>
            <Route path={ROUTER_PATH.THREAD_ID} element={<Thread />} />
            <Route path={ROUTER_PATH.THREAD_EDIT} element={<EditThread />} />
          </Route>
          <Route path={ROUTER_PATH.ALL} element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
