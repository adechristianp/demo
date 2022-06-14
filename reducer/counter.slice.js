import { createSlice } from '@reduxjs/toolkit'

// const collections = {
//   id,
//   collectionName,
// };

const initialState = {
  value: 0,
  status: 'idle',
  scrollPosition: 0,
  collectionList: []
};


export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    setScrollPosition: (state, action) => {
      state.scrollPosition = action.payload
    },
    addCollection: (state, action) => {
      state.collectionList = [...state.collectionList, action.payload]
    }
  }
})

export const {
  increment,
  decrement,
  incrementByAmount,
  setScrollPosition,
  addCollection
} = counterSlice.actions;

export const selectCount = (state) => state.counter.value;

export const selectState = (state) => state.counter;

export const selectCollection = (state) => state.counter.collectionList;

export default counterSlice.reducer;
