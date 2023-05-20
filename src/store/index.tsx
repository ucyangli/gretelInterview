import { configureStore } from "@reduxjs/toolkit";
import { eventsSlice, fetchEvents, updateEventStatus } from "./eventsSlice";
import { residentsSlice, fetchResidents } from "./residentsSlice";




export const store = configureStore({
  reducer: {
    events: eventsSlice.reducer,
    residents: residentsSlice.reducer,
  },
});


export { fetchEvents, updateEventStatus, fetchResidents };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
