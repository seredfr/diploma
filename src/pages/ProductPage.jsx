import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import ErrorWithRetry from '../components/ErrorWithRetry';
import Banner from '../components/Banner';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:7070/api/items/${id}`);
        if (!response.ok) throw new Error('Товар не найден');
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Выберите размер');
      return;
    }
    
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      size: selectedSize,
      price: product.price,
      img: product.images?.[0]
    }));
    
    navigate('/cart.html');
  };

  const availableSizes = product?.sizes?.filter(s => s.available) || [];

  if (loading) {
    return (
      <div className="col">
        <Banner />
        <div className="preloader">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
        <div className="col">
        <Banner />
        <section className="top-sales">
            <h2 className="text-center">Товар не найден</h2>
            <ErrorWithRetry 
            message={error || 'Товар не существует'}
            onRetry={() => window.location.reload()}
            />
        </section>
        </div>
    );
  }
  const hasSizes = availableSizes.length > 0;

  return (
    <div className="col">
      <Banner />
      <section className="catalog-item">
        <h2 className="text-center">{product.title}</h2>
        <div className="row">
          <div className="col-5">
            <img 
              src={product.images?.[0]} 
              className="img-fluid" 
              alt={product.title} 
            />
          </div>
          <div className="col-7">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Артикул</td><td>{product.sku || '—'}</td>
                </tr>
                <tr>
                  <td>Производитель</td><td>{product.manufacturer || '—'}</td>
                </tr>
                <tr>
                  <td>Цвет</td><td>{product.color || '—'}</td>
                </tr>
                <tr>
                  <td>Материалы</td><td>{product.material || '—'}</td>
                </tr>
                <tr>
                  <td>Сезон</td><td>{product.season || '—'}</td>
                </tr>
                <tr>
                  <td>Повод</td><td>{product.reason || '—'}</td>
                </tr>
              </tbody>
            </table>
            
            {hasSizes ? (
                <div className="text-center">
                    <p>
                        Размеры в наличии: 
                        {availableSizes.map(size => (
                        <span 
                            key={size.size}
                            className={`catalog-item-size ${selectedSize === size.size ? 'selected' : ''}`}
                            onClick={() => setSelectedSize(size.size)}
                            style={{ cursor: 'pointer' }}
                        >
                            {size.size}
                        </span>
                        ))}
                    </p>
                    
                    <p>
                        <span style={{ marginRight: '10px' }}>Количество:</span>
                        <span className="btn-group btn-group-sm">
                        <button 
                            className="btn btn-secondary"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >-</button>
                        <span className="btn btn-outline-primary">{quantity}</span>
                        <button 
                            className="btn btn-secondary"
                            onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        >+</button>
                        </span>
                    </p>
                    
                    <button 
                        className="btn btn-danger btn-block btn-lg"
                        onClick={handleAddToCart}
                        disabled={!selectedSize}
                    >
                        В корзину
                    </button>
                </div>
            ) : (
                <div className="text-center text-muted">
                    Нет доступных размеров
                </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;