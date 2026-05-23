import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import CatalogProducts from '../components/CatalogProducts';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/slices/productsSlice';

function CatalogPage() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState(0);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    dispatch(setSearchQuery(query));
  }, [dispatch, query]);

  return (
    <>
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
    </>
  );
}

export default CatalogPage;