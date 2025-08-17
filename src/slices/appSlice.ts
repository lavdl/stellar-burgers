import { getIngredientsApi } from '../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface AppState {
  loading: boolean;
  error: SerializedError | null;
  data: TIngredient[];
}

const initialState: AppState = {
  loading: false,
  error: null,
  data: []
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => await getIngredientsApi()
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.error = null;
          state.data = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});

export const {} = appSlice.actions;
export default appSlice.reducer;
export const appReducer = appSlice.reducer;
