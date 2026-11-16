import './styles/app.scss';

import { ConfigProvider } from 'antd';
import faIr from 'antd/locale/fa_IR';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  scrollRestoration: true,
  scrollRestorationBehavior: 'instant',
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0, // Caching is handled by TanStack Query.
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router,
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element `#root` was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        direction="rtl"
        locale={faIr}
        theme={{
          token: {
            colorPrimary: 'hsl(171, 46%, 24%)',
            colorSuccess: 'hsl(171, 40%, 34%)',
            colorError: 'hsl(4, 68%, 43%)',
            colorInfo: 'hsl(204, 66%, 36%)',
            colorText: 'hsl(175, 14%, 12%)',
            colorTextSecondary: 'hsl(172, 9%, 34%)',
            colorBgBase: 'hsl(0, 0%, 100%)',
            colorBorder: 'hsl(168, 11%, 80%)',
            fontFamily: 'Vazirmatn, "Vazirmatn Fallback: Arial", Tahoma, sans-serif',
            borderRadius: 8,
            controlHeight: 40,
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
);
