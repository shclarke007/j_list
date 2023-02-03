import { useQuery } from 'react-query';

const API_ENDPOINT = 'https://api.teamtailor.com/v1/jobs?page='
/**
 * It's a custom hook that uses the useQuery hook from the react-query library to fetch data from the
 * API endpoint
 * @param pageNumber - The page number of the jobs list to fetch.
 * @returns - data: an array of objects
 *   - meta: an object with the following properties:
 *     - total: number of jobs
 *     - per_page: number of jobs per page
 *     - page: current page number
 *     - last_page: last page number
 *     - next_page_url: url for the next page
 *     - prev_page
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
