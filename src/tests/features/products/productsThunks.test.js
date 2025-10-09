import { describe, it, expect, vi } from 'vitest';
import { fetchProducts } from '../../../features/products/productsThunks';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../../features/products/productsSlice';
import axios from 'axios';

vi.mock('axios');

describe('fetchProducts thunk', () => {
  it('dispatches fulfilled with data', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1 }, { id: 2 }] });
    const store = configureStore({ reducer: { products: productsReducer } });
    await store.dispatch(fetchProducts());
    const state = store.getState().products;
    expect(state.items).toHaveLength(2);
    expect(state.loading).toBe(false);
  });
});


