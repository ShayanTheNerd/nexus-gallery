import { CartItem } from '~/components/cart/CartItem.tsx';
import { CheckoutDetails } from '~/components/checkout/CheckoutDetails.tsx';

import { Empty, message } from 'antd';
import { Link, createFileRoute } from '@tanstack/react-router';

import { useCartStore } from '~/stores/cart.ts';

const Route = createFileRoute('/checkout')({
  component: CheckoutComponent,
  head() {
    return {
      meta: [
        { title: 'تکمیل سفارش — گالری نکسوس' },
      ],
    };
  },
});

function CheckoutComponent() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <main className="checkout-page">
      {contextHolder}
      <div className="checkout-page__heading">
        <h1>تکمیل سفارش</h1>
      </div>

      {items.length === 0 ? (
        <Empty
          className="checkout-empty"
          description="سبد خرید شما خالی است."
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Link className="checkout-return" to="/">مشاهده محصولات</Link>
        </Empty>
      ) : (
        <div className="checkout-layout">
          <section className="checkout-items" aria-label="کالاهای سفارش">
            {items.map((item) => <CartItem key={item.id} item={item} />)}
          </section>

          <CheckoutDetails
            items={items}
            onSubmit={() => {
              clearCart();
              messageApi.success('سفارش شما ثبت شد.');
            }}
          />
        </div>
      )}
    </main>
  );
}

export { Route };
