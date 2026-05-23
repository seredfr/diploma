import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopSales } from '../store/slices/topSalesSlice';
import ProductCard from './ProductCard';

function TopSales() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.topSales);

  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <div className="preloader">
          <span></span><span></span><span></span><span></span>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="products-masonry">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default TopSales;