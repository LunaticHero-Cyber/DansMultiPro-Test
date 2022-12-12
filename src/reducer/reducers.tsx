import {JobInterface} from '@appTypes/job.type';
import {createSlice} from '@reduxjs/toolkit';

const initialState: Array<JobInterface> = [];

export const jobListReducer = createSlice({
  name: 'jobList',
  initialState: initialState,
  reducers: {
    addJobList: (state, action) => {
      return [...state, ...action.payload];
    },
    emptyJobList: state => {
      return [];
    },
  },
});

export const {addJobList, emptyJobList} = jobListReducer.actions;
