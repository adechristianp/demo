import { configureStore } from '@reduxjs/toolkit'

import collectionReducer from './collection.slice';

export function makeStore() {
  return configureStore({
    reducer: { collection: collectionReducer },
  })
}

const store = makeStore();

export default store