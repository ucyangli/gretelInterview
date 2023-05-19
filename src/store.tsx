import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import {Event , Resident} from './types'


interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

interface ResidentsState {
  residents: Resident[];
}

const initialState: EventsState & ResidentsState = {
  events: [],
  loading: false,
  error: null,
  residents: [],
};

export const fetchEvents = createAsyncThunk('events/fetch', async () => {
  // Mocked event data
  const events: Event[] = [
    {
      id: 1,
      type: 'Assistance',
      datetime: 1684477511,
      status: 'active',
      roomId: 12,
      residentId: 23,
    },
    {
      id: 2,
      type: 'Emergency',
      datetime: 1684477512,
      status: 'done',
      roomId: 13,
      residentId: 19,
    },
    {
      id: 3,
      type: 'Assistance',
      datetime: 1684477513,
      status: 'active',
      roomId: 22,
      residentId: 26,
    },
  ];

  return events;
});

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
    }
  ];
  return residents;
});


const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch events.';
      })
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




export const store = configureStore({
  reducer: {
    events: eventsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
