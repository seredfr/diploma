import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, setSelectedCategory } from '../store/slices/categoriesSlice';
import ErrorWithRetry from './ErrorWithRetry';

function Categories({ onCategoryChange }) {
  const dispatch = useDispatch();
  const { items, selected, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    if (onCategoryChange) onCategoryChange(categoryId);
  };

  if (status === 'loading') {
    return <div className="text-center text-muted">Загрузка категорий...</div>;
  }

  if (status === 'failed') {
    return <ErrorWithRetry 
      message={error} 
      onRetry={() => dispatch(fetchCategories())}
    />;
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      {items.map(category => (
        <li className="nav-item" key={category.id}>
          <a 
            className={`nav-link ${selected === category.id ? 'active' : ''}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleCategoryClick(category.id);
            }}
          >
            {category.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Categories;