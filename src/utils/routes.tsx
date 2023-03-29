import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

const Login = lazy(
  () => import(/* webpackChunkName:'Login', webpackPrefetch:true */ '@/pages/Login')
);
const Home = lazy(
  () => import(/* webpackChunkName:'Home', webpackPrefetch:true */ '@/pages/Home')
);
const Article = lazy(
  () => import(/* webpackChunkName:'Article', webpackPrefetch:true */ '@/pages/Article')
);

export interface routeType {
  path: string;
  Element: React.FC;
  auth: boolean;
}

const getElement = (location: any, loginState: boolean, route: routeType) => {
  const { Element, auth } = route;

  if (auth && !loginState) {
    // 未登录，直接返回登陆页面
    return <Navigate to='/' state={{ from: location }} replace />;
  } else if (!auth && loginState) {
    // 已登录，仍访问登录页，避免不必要的登录，返回home页
    return <Navigate to='/home' state={{ from: location }} replace />;
  } else {
    // 正常访问
    return <Element />;
  }
};

export const renderRoutes = (location: any, loginState: boolean, routes: routeType[]) => {
  return routes.map((item: routeType) => {
    return (
      <Route
        key={item.path}
        path={item.path}
        element={getElement(location, loginState, item)}
      />
    );
  });
};

export const routes: routeType[] = [
  {
    path: '/',
    Element: Login,
    auth: false
  },
  {
    path: '/home',
    Element: Home,
    auth: true
  },
  {
    path: '/article',
    Element: Article,
    auth: true
  },
  {
    path: '*',
    Element: Login,
    auth: false
  }
];