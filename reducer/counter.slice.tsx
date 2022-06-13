import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from './store';

export interface CounterState {
  value: number
  scrollPosition: number,
  status: 'idle' | 'loading' | 'failed'
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
  scrollPosition: 0
}

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
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.scrollPosition = action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount, setScrollPosition } = counterSlice.actions;

export const selectCount = (state: AppState) => state.counter.value;

export const selectState = (state: AppState) => state.counter;


export default counterSlice.reducer;
