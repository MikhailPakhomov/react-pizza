import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import './scss/app.scss';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slices/counterSlice';

export const SearchContext = React.createContext('');
export const PageContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const [page, setPage] = React.useState(1);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route
              path={'/'}
              element={<Home searchValue={searchValue} setSearchValue={setSearchValue} />}
            />
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
