import { CartItem } from '~/components/cart/CartItem.tsx';

import { ShoppingCartOutlined } from '@ant-design/icons';
import { Empty, Button, Drawer } from 'antd';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';

import { useCartStore, getItemsCount, getTotalPrice } from '~/stores/cart.ts';
import { localizeNumber } from '~/utils/localizeNumber.ts';

function Cart() {
  const items = useCartStore((state) => state.items);
  const itemsCount = useCartStore(getItemsCount);
  const totalPrice = useCartStore(getTotalPrice);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Button
        className="header-cart-trigger"
        icon={<ShoppingCartOutlined className="shopping-cart-icon" />}
        aria-label={`سبد خرید، ${localizeNumber(itemsCount)} کالا`}
        aria-expanded={isCartOpen}
        onClick={() => {
          setIsCartOpen(true);
        }}
      >
        <span className="header-cart-label">سبد خرید</span>
        <data value={itemsCount}>
          {localizeNumber(itemsCount)}
          <span className="sr-only">کالا</span>
        </data>
      </Button>

      <Drawer
        className="cart-drawer"
        classNames={{ body: 'cart-drawer__body' }}
        title="سبد خرید شما"
        open={isCartOpen}
        placement="left"
        onClose={() => {
          setIsCartOpen(false);
        }}
        footer={items.length > 0 ? (
          <div className="cart-drawer__footer">
            <p>تعداد کالا: {localizeNumber(itemsCount)}</p>
            <strong>جمع کل: {localizeNumber(totalPrice)} تومان</strong>
            <Link
              className="cart-drawer__checkout"
              to="/checkout"
              onClick={() => {
                setIsCartOpen(false);
              }}
            >
              تکمیل سفارش
            </Link>
          </div>
        ) : undefined}
      >
        {items.length > 0 ? (
          <div className="cart-drawer__items" key={isCartOpen ? 'open' : 'closed'}>
            {items.map((item) => <CartItem key={item.id} item={item} />)}
          </div>
        ) : (
          <div key={isCartOpen ? 'open-empty' : 'closed-empty'}>
            <Empty description="سبد خرید شما خالی است." image={Empty.PRESENTED_IMAGE_SIMPLE}>
              <Link
                className="cart-drawer__return"
                to="/"
                onClick={() => {
                  setIsCartOpen(false);
                }}
              >
                مشاهده محصولات
              </Link>
            </Empty>
          </div>
        )}
      </Drawer>
    </>
  );
}

export { Cart };
