import { Cart } from '../cart/Cart.tsx';
import { Logo } from './Logo.tsx';
import { Nav } from './Nav.tsx';

function Header() {
  return (
    <header className="site-header">
      <Logo />
      <Nav />
      <Cart />
    </header>
  );
}

export { Header };
