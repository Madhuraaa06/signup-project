import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './Action/todoslice' 

export const store = configureStore({
  reducer: {
     todos: todoReducer,
  }

});

