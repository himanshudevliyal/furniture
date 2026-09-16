import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const FILE_BASE_URL = process.env.NEXT_PUBLIC_API_FILE_BASE;

// ------------------- FETCH PRODUCT BY SLUG -------------------
export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/product/get-by-slug/${slug}`
      );
      if (!response.ok) {
        console.error("Failed to fetch product:", response.status);
        return rejectWithValue("Failed to fetch product by slug");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ------------------- PRODUCTS SLICE -------------------
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    singleProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleProduct = null; // Clear previous product data
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.singleProduct = null;
        console.error("Product fetch rejected:", state.error);
      });
  },
});

export default productsSlice.reducer;
