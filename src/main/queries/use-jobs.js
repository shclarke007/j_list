import { useQuery } from 'react-query';

const API_ENDPOINT = 'https://api.teamtailor.com/v1/jobs?page='

/**
 * `useQuery` is a custom hook that fetches data from the API and returns the data, isLoading, error,
 * and isSuccess states
 */

const fetchJobsListData = async (pageNumber) => {
  const response =  await fetch(`${API_ENDPOINT}${pageNumber}`, {
    headers: { 
      'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
      'X-Api-Version': `${process.env.REACT_APP_API_VERSION}`,
    }
  });
  const json = await response.json()
  return [json.data, json.meta]
}
export const useJobs = (pageNumber, data, isLoading, error, isSuccess) => {
  return useQuery(['jobs', pageNumber], () => fetchJobsListData(pageNumber), {
    data,
    isLoading,
    error, 
    isSuccess,
    variables: [pageNumber]}
  )
};
