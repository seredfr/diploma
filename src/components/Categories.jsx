import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, setSelectedCategory } from '../store/slices/categoriesSlice';

function Categories({ onCategoryChange }) {
  const dispatch = useDispatch();
  const { items, selected, status } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    if (onCategoryChange) onCategoryChange(categoryId);
  };

  if (status === 'loading') {
    return <div className="preloader"><span></span><span></span><span></span><span></span></div>;
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