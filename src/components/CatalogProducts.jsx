import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, clearProducts } from '../store/slices/productsSlice';
import ProductCard from './ProductCard';

function CatalogProducts({ categoryId, searchQuery }) {
  const dispatch = useDispatch();
  const { items, status, hasMore, offset } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(clearProducts());
    dispatch(fetchProducts({ categoryId, offset: 0, q: searchQuery }));
  }, [dispatch, categoryId, searchQuery]);

  const handleLoadMore = () => {
    dispatch(fetchProducts({ categoryId, offset, q: searchQuery }));
  };

  if (status === 'loading' && items.length === 0) {
    return <div className="preloader"><span></span><span></span><span></span><span></span></div>;
  }

  if (items.length === 0 && status === 'succeeded') {
    return <div className="text-center">Товары не найдены</div>;
  }

  return (
    <>
      <div className="products-masonry">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-4">
          <button 
            className="btn btn-outline-primary" 
            onClick={handleLoadMore}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Загрузка...' : 'Загрузить ещё'}
          </button>
        </div>
      )}
    </>
  );
}

export default CatalogProducts;