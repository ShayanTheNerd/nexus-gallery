import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtools as TanstackQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, HeadContent, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Header } from '~/components/Header/Header';

const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <HeadContent />

      <Header />

      <Outlet />

      <TanStackDevtools
        plugins={[
          { name: 'TanStack Query', render: <TanstackQueryDevtools /> },
          { name: 'TanStack Router', render: <TanStackRouterDevtools /> },
        ]}
      />
    </>
  );
}

export { Route };
