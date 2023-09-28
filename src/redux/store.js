import { configureStore } from '@reduxjs/toolkit'
import checkSlice from './slice/checkSlice'

export const store = configureStore({
  reducer: {
    check: checkSlice,
  },
})