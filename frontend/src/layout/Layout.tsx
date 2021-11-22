import React, { FunctionComponent, ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto">
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
