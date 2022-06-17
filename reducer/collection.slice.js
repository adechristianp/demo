import { createSlice } from '@reduxjs/toolkit'

let localData;

if (typeof window !== 'undefined') {
  localData = JSON.parse(localStorage.getItem('LOCAL_STATE'));
}

const initialState = {
  collectionList: [],
  animeCollection: []
};

export const collectionSlice = createSlice({
  name: 'collections',
  initialState: localData || initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateState: (state, action) => state = action.payload,
    addCollection: (state, action) => {
      state.collectionList = [...state.collectionList, action.payload]
    },
    editCollection: (state, action) => {
      state.collectionList = action.payload
    },
    addAnime: (state, action) => {
      state.animeCollection = [...state.animeCollection, action.payload]
    }
  }
})

export const {
  addCollection,
  addAnime,
  editCollection
} = collectionSlice.actions;

export const selectState = (state) => state.collection;

export const selectCollection = (state) => state.collection.collectionList;

export const selectAnimes = (state) => state.collection.animeCollection;

export const selectAnimeById = (id) =>
  (state) => state.collection.animeCollection.filter(v => v.collectionId === id)

export default collectionSlice.reducer;
