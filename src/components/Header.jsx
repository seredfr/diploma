import { Link, NavLink } from 'react-router-dom';
import SearchWidget from './SearchWidget';

function Header() {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src="/img/header-logo.png" alt="Bosa Noga" />
            </Link>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain">
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/catalog.html">Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about.html">О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contacts.html">Контакты</NavLink>
                </li>
              </ul>
            </div>
            
            <div>
              <div className="header-controls-pics">
                <SearchWidget />
                <div className="header-controls-pic header-controls-cart">
                  <div className="header-controls-cart-full">1</div>
                  <div className="header-controls-cart-menu"></div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;