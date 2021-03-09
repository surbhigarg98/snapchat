import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import cameraReducer from '../features/cameraSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    camera:cameraReducer
  },
});
