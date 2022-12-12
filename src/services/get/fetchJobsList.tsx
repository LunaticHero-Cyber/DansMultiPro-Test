import axios from 'axios';

import {JobInterface} from '@appTypes/job.type';
import {HOST_JOBS_URL} from 'constants/api';

export const fetchJobsList = async (): Promise<Array<JobInterface>> => {
  try {
    const response = await axios.get<Array<JobInterface>>(HOST_JOBS_URL);
    return response.data;
  } catch (err) {
    throw err;
  }
};
