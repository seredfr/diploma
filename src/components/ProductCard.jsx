import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img 
        src={product.images?.[0] || '/img/no-image.jpg'} 
        alt={product.title} 
      />
      <div className="product-card-body">
        <p className="product-card-title">{product.title}</p>
        <p className="product-card-price">{product.price.toLocaleString()} руб.</p>
        <Link to={`/catalog/${product.id}.html`} className="btn btn-outline-primary">
          Заказать
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;