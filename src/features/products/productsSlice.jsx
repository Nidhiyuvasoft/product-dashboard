import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsThunks";

const initialState = {
  items: [],
  loading: false,
  error: null,
  categories: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.categories = [...new Set(action.payload.map(p => p.category))];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
