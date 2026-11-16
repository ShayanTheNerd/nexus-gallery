import { ProductCard } from '~/components/ProductCard.tsx';

import { Spin, Alert, Empty, Button, Skeleton } from 'antd';
import { useRef, useEffect } from 'react';
import { useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { productsInfiniteQueryOptions } from '~/api/queries/products.queries.ts';

const Route = createFileRoute('/')({
  component: LandingComponent,
});

function LandingComponent() {
  const queryClient = useQueryClient();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    isFetchNextPageError,
    refetch,
  } = useInfiniteQuery(productsInfiniteQueryOptions(queryClient));
  const products = data?.pages.flatMap((page) => page.products) ?? [];

  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = loadMoreRef.current;
    let observer: IntersectionObserver | null = null;

    if (target && hasNextPage && !isFetchingNextPage && !isFetchNextPageError) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            void fetchNextPage();
          }
        },
        { rootMargin: '150px 0px' },
      );
      observer.observe(target);
    }

    return () => {
      observer?.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchNextPageError, isFetchingNextPage]);

  return (
    <main className="gallery-page">
      <hgroup className="page-heading">
        <p className="page-heading__eyebrow">کالکشن نکسوس</p>
        <h1>گالری محصولات</h1>
        <p>محصولات منتخب، برای دیدن و انتخاب کردن</p>
      </hgroup>

      {isPending && (
        <section className="product-grid product-grid--skeleton" aria-label="در حال دریافت محصولات">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="product-skeleton" key={index} aria-hidden="true">
              <Skeleton active title paragraph={{ rows: 3 }} />
            </div>
          ))}
        </section>
      )}

      {isError && products.length === 0 && (
        <Alert
          className="gallery-error"
          type="error"
          showIcon
          title="دریافت محصولات ناموفق بود."
          description={error.message}
          action={<Button onClick={() => { void refetch(); }}>تلاش دوباره</Button>}
        />
      )}

      {!isPending && !isError && products.length === 0 && (
        <Empty description="محصولی برای نمایش وجود ندارد" />
      )}

      {products.length > 0 && (
        <>
          <section className="product-grid" aria-label="محصولات">
            {products.map((product, index) => (
              <div className="product-grid__item" key={product.id}>
                <ProductCard product={product} loading={index < 8 ? 'eager' : 'lazy'} />
              </div>
            ))}
          </section>

          {hasNextPage && <div ref={loadMoreRef} aria-hidden="true" style={{ height: 1 }} />}

          {isFetchingNextPage && (
            <output className="gallery-loading-more">
              <Spin size="small" />
              <span>در حال دریافت محصولات بیشتر...</span>
            </output>
          )}

          {isFetchNextPageError && (
            <Alert
              className="gallery-error"
              type="error"
              showIcon
              title="دریافت محصولات بیشتر ناموفق بود."
              action={<Button onClick={() => { void fetchNextPage(); }}>تلاش دوباره</Button>}
            />
          )}

          {!hasNextPage && (
            <output className="gallery-no-more">
              <p>انتهای کاتالوگ</p>
            </output>
          )}
        </>
      )}
    </main>
  );
}

export { Route };
