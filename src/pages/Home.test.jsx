import { describe, it, expect } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

// Prevent Home from dispatching the real fetch thunk which toggles loading
vi.mock('../features/products/productsThunks', () => ({
  fetchProducts: () => ({ type: 'products/fetchProducts/mock' })
}));

function renderWithStore(preloadedState) {
  const store = configureStore({
    reducer: {
      // Minimal reducers that just expose the provided state; avoids slice extraReducers setup
      products: (state = preloadedState.products) => state,
      favorites: (state = preloadedState.favorites ?? []) => state,
    },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );
}

describe('Home integration: search, filter, sort', () => {
  const items = [
    { id: 1, title: 'Blue Shirt', price: 20, category: 'clothes', image: 'about:blank' },
    { id: 2, title: 'Red Hat', price: 10, category: 'accessories', image: 'about:blank' },
    { id: 3, title: 'Green Shirt', price: 15, category: 'clothes', image: 'about:blank' },
  ];

  function baseState() {
    return { products: { items, loading: false, error: null, categories: ['clothes', 'accessories'] }, favorites: [] };
  }

  it('filters by debounced search input', async () => {
    const user = userEvent.setup();
    renderWithStore(baseState());

    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, 'shirt');

    // advance debounce timer
    await new Promise(r => setTimeout(r, 350));

    const cards = screen.getAllByRole('link', { name: /view details/i });
    expect(cards).toHaveLength(2);
  });

  it('filters by category and sorts by price asc', async () => {
    const user = userEvent.setup();
    renderWithStore(baseState());

    const selects = screen.getAllByRole('combobox');
    const categorySelect = selects[0];
    const sortSelect = selects[1];
    await user.selectOptions(categorySelect, 'clothes');
    await user.selectOptions(sortSelect, 'asc');

    const prices = screen.getAllByText(/\$/).map(el => Number(el.textContent.replace('$', '')));
    expect(prices).toEqual([15, 20]);
  });
});


