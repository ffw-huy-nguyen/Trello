import React, { FunctionComponent, ReactNode } from 'react';
import { Link, HashRouter as Router } from 'react-router-dom';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-3xl py-4 text-orange uppercase">
        <Link to="/">Guard Rail IO</Link>
      </h1>
      <main role="main">{children}</main>
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
