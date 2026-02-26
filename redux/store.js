import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./reducers/slice/rootReducer";

import { authApiSlice } from "../service/auth/auth";
import { contactApiSlice } from "../service/contact/contact";
import { userDetailApiSlice } from "../service/auth/userDetails";
import { musicApiSlice } from "../service/music/music";
import { paymentApiSlice } from "../service/payment/payment";
import { albumApiSlice } from "../service/album/album";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    // cart: cartReducer,
    persistedReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [contactApiSlice.reducerPath]: contactApiSlice.reducer,
    [userDetailApiSlice.reducerPath]: userDetailApiSlice.reducer,
    [musicApiSlice.reducerPath]: musicApiSlice.reducer,
    [paymentApiSlice.reducerPath]: paymentApiSlice.reducer,
    [albumApiSlice.reducerPath]: albumApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApiSlice.middleware,
      contactApiSlice.middleware,
      userDetailApiSlice.middleware,
      musicApiSlice.middleware,
      paymentApiSlice.middleware,
      albumApiSlice.middleware,
    ),
});

const persistor = persistStore(store);
setupListeners(store.dispatch);

export { store, persistor };
