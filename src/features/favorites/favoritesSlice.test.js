import { describe, it, expect } from 'vitest';
import reducer, { addFavorite, removeFavorite, clearFavorites } from './favoritesSlice';

// Mock localStorage for slice side-effects
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value; },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('favoritesSlice', () => {
  const product = { id: 1, title: 'A', price: 10 };

  it('should return initial state', () => {
    expect(reducer(undefined, { type: '@@init' })).toEqual([]);
  });

  it('adds a favorite once (no duplicates)', () => {
    const state1 = reducer([], addFavorite(product));
    const state2 = reducer(state1, addFavorite(product));
    expect(state1).toHaveLength(1);
    expect(state2).toHaveLength(1);
    expect(window.localStorage.getItem('favorites')).toContain('"id":1');
  });

  it('removes a favorite', () => {
    const start = [product];
    const state = reducer(start, removeFavorite(1));
    expect(state).toEqual([]);
  });

  it('clears favorites', () => {
    const start = [product];
    const state = reducer(start, clearFavorites());
    expect(state).toEqual([]);
  });
});


