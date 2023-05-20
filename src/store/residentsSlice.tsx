import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Resident } from '../types'



interface ResidentsState {
  residents: Resident[];
  loading: boolean;
  error: string | null;
}


export const fetchResidents = createAsyncThunk('residents/fetch', async () => {
  // Mocked resident data
  const residents: Resident[] = [
    {
      id: 23,
      name: 'John',
      age: 65,
    },
    {
      id: 26,
      name: 'Josh',
      age: 55,
    },
    {
      id: 19,
      name: 'Chris',
      age: 88,
    },
    {
      id: 11,
      name: 'Momo',
      age: 52,
    }
  ];
  return residents;
});


export const residentsSlice = createSlice({
  name: 'residents',
  initialState: {
    residents: [],
    loading: false,
    error: null,
  } as  ResidentsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResidents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResidents.fulfilled, (state, action) => {
        state.loading = false;
        state.residents = action.payload;
      })
      .addCase(fetchResidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch residents.';
      });
  },
});


