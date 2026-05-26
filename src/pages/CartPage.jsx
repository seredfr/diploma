import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import Banner from '../components/Banner';

function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [orderStatus, setOrderStatus] = useState('idle');
  const [orderError, setOrderError] = useState(null);
  
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    agreement: false
  });

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const savedPhone = localStorage.getItem('orderPhone');
    const savedAddress = localStorage.getItem('orderAddress');
    if (savedPhone) setFormData(prev => ({ ...prev, phone: savedPhone }));
    if (savedAddress) setFormData(prev => ({ ...prev, address: savedAddress }));
  }, []);


  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      dispatch(updateQuantity({
        id: item.id,
        size: item.size,
        quantity: newQuantity
      }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart({ id: item.id, size: item.size }));
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    if (name === 'phone' || name === 'address') {
      localStorage.setItem(`order${name.charAt(0).toUpperCase() + name.slice(1)}`, newValue);
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!formData.phone || !formData.address || !formData.agreement) {
      alert('Заполните все поля и подтвердите согласие');
      return;
    }

    const orderItems = items.map(item => ({
      id: item.id,
      price: item.price,
      count: item.quantity
    }));

    setOrderStatus('loading');
    
    try {
      const response = await fetch('http://localhost:7070/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: {
            phone: formData.phone,
            address: formData.address
          },
          items: orderItems
        })
      });
      
      if (!response.ok) {
        throw new Error('Ошибка оформления заказа');
      }
      
      setOrderStatus('success');
      dispatch(clearCart());
      setFormData({ phone: '', address: '', agreement: false });
      
      setTimeout(() => setOrderStatus('idle'), 3000);
    } catch (error) {
      setOrderStatus('error');
      setOrderError(error.message);
      setTimeout(() => setOrderStatus('idle'), 3000);
    }
  };

  if (items.length === 0) {
    return (
      <div className="col">
        <Banner />
        <section className="cart">
          <h2 className="text-center">Корзина</h2>
          <div className="text-center">
            <p>Ваша корзина пуста</p>
            <Link to="/catalog.html" className="btn btn-outline-primary">
              Перейти в каталог
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="col">
      <Banner />
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={`${item.id}-${item.size}`}>
                <td>{idx + 1}</td>
                <td><Link to={`/catalog/${item.id}.html`}>{item.title}</Link></td>
                <td>{item.size}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleQuantityChange(item, -1)}
                    >-</button>
                    <span className="btn btn-outline-primary">{item.quantity}</span>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleQuantityChange(item, 1)}
                    >+</button>
                  </div>
                </td>
                <td>{item.price.toLocaleString()} руб.</td>
                <td>{(item.price * item.quantity).toLocaleString()} руб.</td>
                <td>
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemove(item)}
                  >Удалить</button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="5" className="text-right"><strong>Общая стоимость</strong></td>
              <td colSpan="2"><strong>{totalAmount.toLocaleString()} руб.</strong></td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
          <form className="card-body" onSubmit={handleSubmitOrder}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input 
                className="form-control" 
                id="phone" 
                name="phone"
                placeholder="Ваш телефон" 
                value={formData.phone}
                onChange={handleFormChange}
                disabled={orderStatus === 'loading'}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input 
                className="form-control" 
                id="address" 
                name="address"
                placeholder="Адрес доставки" 
                value={formData.address}
                onChange={handleFormChange}
                disabled={orderStatus === 'loading'}
              />
            </div>
            <div className="form-group form-check">
              <input 
                type="checkbox" 
                className="form-check-input" 
                id="agreement" 
                name="agreement"
                checked={formData.agreement}
                onChange={handleFormChange}
                disabled={orderStatus === 'loading'}
              />
              <label className="form-check-label" htmlFor="agreement">
                Согласен с правилами доставки
              </label>
            </div>
            <button 
              type="submit" 
              className="btn btn-outline-secondary"
              disabled={orderStatus === 'loading'}
            >
              {orderStatus === 'loading' ? 'Оформление...' : 'Оформить'}
            </button>
            {orderStatus === 'success' && (
              <div className="alert alert-success mt-3">Заказ успешно оформлен!</div>
            )}
            {orderStatus === 'error' && (
              <div className="alert alert-danger mt-3">Ошибка: {orderError}</div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default CartPage;