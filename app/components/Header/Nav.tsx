import { Link } from '@tanstack/react-router';

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" activeProps={{ className: 'is-active' }}>محصولات</Link>
        </li>
        <li>
          <Link to="/checkout" activeProps={{ className: 'is-active' }}>تکمیل سفارش</Link>
        </li>
      </ul>
    </nav>
  );
}

export { Nav };
