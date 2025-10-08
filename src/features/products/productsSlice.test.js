import { describe, it, expect } from 'vitest';
import reducer from './productsSlice';
import { fetchProducts } from './productsThunks';

describe('productsSlice', () => {
  it('handles pending', () => {
    const state = reducer(undefined, { type: fetchProducts.pending.type });
    expect(state.loading).toBe(true);
  });

  it('handles fulfilled and builds categories', () => {
    const payload = [
      { id: 1, category: 'a' },
      { id: 2, category: 'b' },
      { id: 3, category: 'a' },
    ];
    const state = reducer(undefined, { type: fetchProducts.fulfilled.type, payload });
    expect(state.loading).toBe(false);
    expect(state.items).toHaveLength(3);
    expect([...state.categories].sort()).toEqual(['a', 'b']);
  });

  it('handles rejected', () => {
    const state = reducer(undefined, { type: fetchProducts.rejected.type, error: { message: 'err' } });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('err');
  });
});


