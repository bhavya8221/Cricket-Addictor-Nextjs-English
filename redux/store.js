import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/counter";

const store = configureStore({
  reducer: {
    counter: rootReducer,
  },
});

export default store;
