import { useState } from 'react';
import Banner from '../components/Banner';
import TopSales from '../components/TopSales';
import Categories from '../components/Categories';
import CatalogProducts from '../components/CatalogProducts';

function HomePage() {
  const [categoryId, setCategoryId] = useState(0);

  return (
    <>
      <Banner />
      <TopSales />
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Categories onCategoryChange={setCategoryId} />
        <CatalogProducts categoryId={categoryId} searchQuery="" />
      </section>
    </>
  );
}

export default HomePage;