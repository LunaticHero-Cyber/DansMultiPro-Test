import axios from 'axios';

import {JobInterface} from '@appTypes/job.type';
import {HOST_JOBS_URL} from 'constants/api';
import {generateAPIQueryParams} from 'utils/common';

type JobListParams = Partial<
  Record<'description' | 'location' | 'full_time', string>
> &
  Partial<Record<'page', number>>;

export const fetchJobsList = async (
  params?: JobListParams,
): Promise<Array<JobInterface>> => {
  try {
    const query = params ? `?${generateAPIQueryParams(params)}` : '';
    console.log(query);
    const response = await axios.get<Array<JobInterface>>(
      `${HOST_JOBS_URL}?${query}`,
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
