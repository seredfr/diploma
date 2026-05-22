import Banner from '../components/Banner';

function HomePage() {
  return (
    <>
      <Banner />
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <p className="text-center">в разработке</p>
      </section>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <p className="text-center">в разработке</p>
      </section>
    </>
  );
}

export default HomePage;