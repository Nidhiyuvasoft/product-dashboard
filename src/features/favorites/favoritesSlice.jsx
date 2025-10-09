import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("favorites")) || [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      
      if (!state.find(item => item.id === action.payload.id)) {
        state.push(action.payload);
        
        localStorage.setItem("favorites", JSON.stringify(state));
      }
    },
    removeFavorite: (state, action) => {
      const updated = state.filter(item => item.id !== action.payload);
      
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    },
    clearFavorites: (state) => {
      localStorage.removeItem("favorites");
      return [];
    }
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
