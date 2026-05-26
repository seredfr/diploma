import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import CatalogProducts from '../components/CatalogProducts';

function CatalogPage() {
  const [searchParams] = useSearchParams();
  const selectedCategory = useSelector((state) => state.categories.selected);
  const [categoryId, setCategoryId] = useState(selectedCategory);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    setCategoryId(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="col">
      <Banner />
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <form className="catalog-search-form form-inline">
          <input 
            className="form-control" 
            placeholder="Поиск" 
            defaultValue={query}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                window.location.href = `/catalog.html?q=${encodeURIComponent(e.target.value)}`;
              }
            }}
          />
        </form>
        <Categories onCategoryChange={setCategoryId} />
        <CatalogProducts categoryId={categoryId} searchQuery={query} />
      </section>
    </div>
  );
}

export default CatalogPage;