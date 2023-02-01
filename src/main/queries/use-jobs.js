import { useQuery } from 'react-query';

const API_ENDPOINT = 'https://api.teamtailor.com/v1/jobs'

/**
 * `useQuery` is a custom hook that fetches data from the API and returns the data, isLoading, error,
 * and isSuccess states
 */

const fetchJobsListData = async () => {
  const response =  await fetch(`${API_ENDPOINT}`, {
    headers: { 
      'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
      'X-Api-Version': `${process.env.REACT_APP_API_VERSION}`,
    }
  });
  const json = await response.json()
  return json.data
}

export const useJobs = (data, isLoading, error, isSuccess) => {
  return useQuery('jobs', fetchJobsListData, {
    data,
    isLoading,
    error, 
    isSuccess }
  )
};
