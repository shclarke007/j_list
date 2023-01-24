import { useEffect, useState } from 'react';

const API_ENDPOINT = `https://api.teamtailor.com/v1/jobs`

export const useJobs = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({ show: false, message: '' })
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_ENDPOINT}`, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
            'X-Api-Version': `${process.env.REACT_APP_API_VERSION}`,
          }
        });
        const json = await response.json();
        setData(json.data);
        setIsLoading(false);
      } catch (err) {
        setError({ show: true, message: err.message });
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return {
    data,
    error,
    isLoading
  }
};
