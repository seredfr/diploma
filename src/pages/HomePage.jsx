import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Banner from '../components/Banner';
import TopSales from '../components/TopSales';
import Categories from '../components/Categories';
import CatalogProducts from '../components/CatalogProducts';

function HomePage() {
  const selectedCategory = useSelector((state) => state.categories.selected);
  const [categoryId, setCategoryId] = useState(selectedCategory);

  useEffect(() => {
    setCategoryId(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="col">
      <Banner />
      <TopSales />
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Categories onCategoryChange={setCategoryId} />
        <CatalogProducts categoryId={categoryId} searchQuery="" />
      </section>
    </div>
  );
}

export default HomePage;