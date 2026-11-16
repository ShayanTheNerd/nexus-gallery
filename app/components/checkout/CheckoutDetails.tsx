import type { CartItem } from '~/stores/cart.ts';

import { Button } from 'antd';

import { useCartStore, getItemsCount, getTotalPrice } from '~/stores/cart.ts';
import { localizeNumber } from '~/utils/localizeNumber.ts';

interface Props {
  items: CartItem[],
  onSubmit(): void,
}

function CheckoutDetails(props: Props) {
  const itemCount = useCartStore(getItemsCount);
  const totalPrice = useCartStore(getTotalPrice);

  return (
    <section className="checkout-summary" aria-labelledby="checkout_summary_title">
      <h2 id="checkout_summary_title">خلاصه سفارش</h2>

      <dl>
        <div>
          <dt>تعداد کالا:</dt>
          <dd>{localizeNumber(props.items.length)}</dd>
        </div>

        <div>
          <dt>تعداد کل:</dt>
          <dd>{localizeNumber(itemCount)}</dd>
        </div>
      </dl>

      <hr />

      <strong>جمع کل: {localizeNumber(totalPrice)} تومان</strong>
      <Button type="primary" block onClick={props.onSubmit}>ثبت سفارش</Button>
    </section>
  );
}

export { CheckoutDetails };
