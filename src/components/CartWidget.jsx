import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CartWidget() {
  const items = useSelector((state) => state.cart.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/cart.html" className="header-controls-pic header-controls-cart">
      {totalItems > 0 && (
        <div className="header-controls-cart-full">{totalItems}</div>
      )}
      <div className="header-controls-cart-menu"></div>
    </Link>
  );
}

export default CartWidget;