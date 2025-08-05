import stepLoginReducer from '@/redux/allSlice/stepLoginSlice';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import adminAuth from './ReduxFunction';
import baseApi from './api/baseApi';
import { wordpressApi } from './api/wordpressApi';

import paymentIdreducer from '@/redux/allSlice/paymentSlice';

// Persist configuration for `formData`
const persistConfig = {
  key: 'root',
  storage,
};
// Persist configuration for `formData`
const payIdConfig = {
  key: 'payId',
  storage,
};

const stepLoginConfig = {
  key: 'payId',
  storage,
};

const persistPayid = persistReducer(payIdConfig, paymentIdreducer);

const persistedReducer = persistReducer(persistConfig, adminAuth);

const persistStepReducer = persistReducer(stepLoginConfig, stepLoginReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    payId: persistPayid,
    stepLogin: persistStepReducer,
    // Add API reducers
    [baseApi.reducerPath]: baseApi.reducer,
    [wordpressApi.reducerPath]: wordpressApi.reducer,
    // [stripeApi.reducerPath]: stripeApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['Auth.somePathWithNonSerializableValues'],
      },
    }).concat(baseApi.middleware, wordpressApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
