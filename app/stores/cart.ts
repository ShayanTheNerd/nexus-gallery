import type { Products } from '~/schemas/products.schemas.ts';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Product = Products['getItems'][number];
type CartItem = Pick<Product, 'id' | 'image' | 'price' | 'title'> & {
  quantity: number,
};

interface CartState {
  items: CartItem[],
  addItem(product: Product): void,
  increment(id: number): void,
  decrement(id: number): void,
  setQuantity(id: number, quantity: number): void,
  removeItem(id: number): void,
  clearCart(): void,
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          const isAlreadyInCart = state.items.some((item) => item.id === product.id);
          const items = isAlreadyInCart
            ? state.items.map((item) => (
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ))
            : [
              ...state.items,
              { ...product, quantity: 1 },
            ];

          return { items };
        });
      },
      increment: (id) => {
        set((state) => ({
          items: state.items.map((item) => (
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          )),
        }));
      },
      decrement: (id) => {
        set((state) => ({
          items: state.items.map((item) => (
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
          )),
        }));
      },
      setQuantity: (id, quantity) => {
        if (!Number.isSafeInteger(quantity) || quantity < 1) {
          return;
        }

        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }));
      },
      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'nexus-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        items: readCartItems(persistedState),
      }),
    },
  ),
);

function getItemsCount(state: CartState): number {
  return state.items.reduce((count, item) => count + item.quantity, 0);
}

function getTotalPrice(state: CartState): number {
  return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function readCartItems(persistedState: unknown): CartItem[] {
  if (typeof persistedState !== 'object' || persistedState === null || !('items' in persistedState)) {
    return [];
  }

  const { items } = persistedState;

  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter(isCartItem);
}

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  return (
    'id' in value && typeof value.id === 'number' &&
    'title' in value && typeof value.title === 'string' &&
    'price' in value && typeof value.price === 'number' && Number.isFinite(value.price) &&
    'image' in value && typeof value.image === 'string' &&
    'quantity' in value && typeof value.quantity === 'number' &&
    Number.isSafeInteger(value.quantity) && value.quantity > 0
  );
}

export { useCartStore, getItemsCount, getTotalPrice };
export type { CartItem };
