import {configureStore} from '@reduxjs/toolkit';
import {jobListReducer} from './reducers';

export const Store = configureStore({
  reducer: {jobList: jobListReducer.reducer},
});
