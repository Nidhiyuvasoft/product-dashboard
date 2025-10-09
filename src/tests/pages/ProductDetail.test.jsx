import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../features/products/productsSlice';
import favoritesReducer from '../../features/favorites/favoritesSlice';
import ProductDetail from '../../pages/ProductDetail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

vi.mock('axios');

function renderWithStore(id) {
  const store = configureStore({ reducer: { products: productsReducer, favorites: favoritesReducer } });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/product/${id}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('ProductDetail favorites', () => {
  it('loads product and adds to favorites', async () => {
    axios.get.mockResolvedValue({ data: { id: 1, title: 'Item', description: 'd', price: 5, image: '' } });
    renderWithStore('1');

    const btn = await screen.findByRole('button', { name: /add to favorites/i });
    const user = userEvent.setup();
    await user.click(btn);

    expect(window.localStorage.getItem('favorites')).toContain('"id":1');
  });
});


