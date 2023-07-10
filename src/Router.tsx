import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Spinner from './components/Spinner';
import { ROUTER_PATH } from './constants/path';

const EditThread = lazy(() => import('./pages/editThread/index'));
const Home = lazy(() => import('./pages/home/index'));
const Join = lazy(() => import('./pages/join/index'));
const Login = lazy(() => import('./pages/login/index'));
const NotFound = lazy(() => import('./pages/notfound/index'));
const Thread = lazy(() => import('./pages/thread/index'));
const Write = lazy(() => import('./pages/write/index'));
const UserProfile = lazy(() => import('./pages/userprofile/index'));
const ChangePassword = lazy(() => import('./pages/changePassword/index'));

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
