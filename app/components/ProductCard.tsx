import type { Products } from '~/schemas/products.schemas.ts';

import { CheckOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState, useEffect } from 'react';

import { useCartStore } from '~/stores/cart.ts';
import { localizeNumber } from '~/utils/localizeNumber.ts';

type Product = Products['getItems'][number];

interface Props {
  product: Product,
  loading?: 'lazy' | 'eager',
}

function ProductCard(props: Props) {
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);
  const cartItem = useCartStore((state) => state.items.find((item) => item.id === props.product.id));
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const timeoutId = showAddedFeedback
      ? setTimeout(() => {
        setShowAddedFeedback(false);
      }, 1500)
      : null;

    function cleanup() {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    }

    return cleanup;
  }, [showAddedFeedback]);

  return (
    <article className="product-card">
      <figure>
        <img
          src={props.product.image}
          alt={props.product.title}
          width={500}
          height={500}
          loading={props.loading}
        />
      </figure>

      <h2>{props.product.title}</h2>

      <div>
        <strong>{localizeNumber(props.product.price)} تومان</strong>
        {cartItem && (
          <span className="product-card__quantity">{localizeNumber(cartItem.quantity)} عدد در سبد خرید</span>
        )}
      </div>

      <Button
        className={`product-card__add ${showAddedFeedback ? 'is-added' : ''}`}
        type="primary"
        icon={showAddedFeedback ? <CheckOutlined /> : <ShoppingCartOutlined className="shopping-cart-icon" />}
        onClick={() => {
          addItem(props.product);
          setShowAddedFeedback(true);
        }}
      >
        {showAddedFeedback ? 'افزوده شد' : 'افزودن به سبد خرید'}
      </Button>
    </article>
  );
}

export { ProductCard };
