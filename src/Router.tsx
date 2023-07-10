import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Spinner from './components/Spinner';
import { ROUTER_PATH } from './constants/path';

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
