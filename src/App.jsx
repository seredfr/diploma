import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className="container">
          <div className="row">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog.html" element={<CatalogPage />} />
              <Route path="/about.html" element={<AboutPage />} />
              <Route path="/contacts.html" element={<ContactsPage />} />
              <Route path="/cart.html" element={<CartPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;