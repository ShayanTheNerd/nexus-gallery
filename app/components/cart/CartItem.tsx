import type { CartItem as CartItemType } from '~/stores/cart.ts';

import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, InputNumber } from 'antd';
import { useState, useEffect } from 'react';

import { useCartStore } from '~/stores/cart.ts';
import { localizeNumber } from '~/utils/localizeNumber.ts';

interface Props {
  item: CartItemType,
}

function CartItem(props: Props) {
  const [shakeDecrement, setShakeDecrement] = useState(false);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const decrement = useCartStore((state) => state.decrement);
  const increment = useCartStore((state) => state.increment);
  const removeItem = useCartStore((state) => state.removeItem);

  useEffect(() => {
    const timeoutId = shakeDecrement
      ? setTimeout(() => {
        setShakeDecrement(false);
      }, 460)
      : null;

    function cleanup() {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    }

    return cleanup;
  }, [shakeDecrement]);

  return (
    <article className="cart-item">
      <figure className="cart-item__image">
        <img
          src={props.item.image}
          alt=""
          width={120}
          height={120}
          loading="lazy"
        />
      </figure>

      <hgroup className="cart-item__details">
        <h3>{props.item.title}</h3>
        <p>{localizeNumber(props.item.price)} تومان به‌ازای هر واحد</p>
        <strong>{localizeNumber(props.item.price * props.item.quantity)} تومان</strong>
      </hgroup>

      <div className="cart-item__actions">
        <Button
          className={shakeDecrement ? 'is-shaking' : undefined}
          title="کاهش تعداد"
          icon={<MinusOutlined />}
          onClick={() => {
            if (props.item.quantity <= 1) {
              setShakeDecrement(true);
            } else {
              setShakeDecrement(false);
              decrement(props.item.id);
            }
          }}
        />

        <InputNumber
          title="تعداد"
          min={1}
          value={props.item.quantity}
          controls={false}
          onChange={(quantity) => {
            if (typeof quantity === 'number') {
              setQuantity(props.item.id, quantity);
            }
          }}
        />

        <Button
          title="افزایش تعداد"
          icon={<PlusOutlined />}
          onClick={() => {
            increment(props.item.id);
          }}
        />

        <Button
          danger
          title="حذف از سبد خرید"
          icon={<DeleteOutlined />}
          onClick={() => {
            removeItem(props.item.id);
          }}
        />
      </div>
    </article>
  );
}

export { CartItem };
