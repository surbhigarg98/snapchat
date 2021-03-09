import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    user:null,
    selectedImage:null
  },
  reducers: {
   selectImage:(state,action)=>{
     state.selectedImage = action.payload;
   },
   resetIamge:(state)=>{
     state.selectedImage = null;
   },
   login:(state,action)=>{
     state.user = action.payload;
   },
   logout:(state)=>{
     state.user = null;
   }
  },
});

export const { selectImage,resetIamge,login,logout} = counterSlice.actions;


export const selectUser = state => state.counter.user;
export const selectSelectedImage = state => state.counter.selectedImage;


export default counterSlice.reducer;
