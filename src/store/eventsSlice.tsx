import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Event, EventType, EventStatus } from '../types'




interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}



export const fetchEvents = createAsyncThunk('events/fetch', async () => {
  // Mocked event data
  const events: Event[] = [
    {
      id: 1,
      type: EventType.Assistant,
      datetime: 1684477511,
      status: EventStatus.active,
      roomId: 12,
      residentId: 23,
    },
    {
      id: 2,
      type: EventType.Emergency,
      datetime: 1684477512,
      status: EventStatus.done,
      roomId: 13,
      residentId: 19,
    },
    {
      id: 3,
      type: EventType.Assistant,
      datetime: 1684477513,
      status: EventStatus.active,
      roomId: 22,
      residentId: 26,
    },
    {
      id: 4,
      type: EventType.Emergency,
      datetime: 1684477599,
      status: EventStatus.active,
      roomId: 15,
      residentId: 11,
    },
  ];

  return events;
});




export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    loading: false,
    error: null,
  } as EventsState,
  reducers: {
    updateEventStatus: (state, action: PayloadAction<{ eventId: number }>) => {
      const { eventId } = action.payload;
      const event = state.events.find((e) => e.id === eventId);
      if (event) {
        event.status = EventStatus.done;
      }
    },
  },
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
  },
});




export const { updateEventStatus } = eventsSlice.actions;