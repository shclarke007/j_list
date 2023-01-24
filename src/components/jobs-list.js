import React from 'react';
import { useJobs } from '../main/queries/use-jobs';
import { Nav } from './nav';
import { Card, Image } from 'semantic-ui-react';

export const JobsList = () => {
  const { data, isLoading, error } = useJobs()
  
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  
  
  if (error.show) {
    return <h2>{error.message}</h2>
  }
  
  return (
    <>
      <Nav />
      <div>
        {
          data?.map((job) => (
            <Card key={job.id}>
              <Image src={job.attributes.picture.thumb} />
              <Card.Content>
                <Card.Header>
                  {job.attributes.title}
                </Card.Header>
                <Card.Description>
                  {job.attributes.pitch}
                </Card.Description>
                <Card.Meta>
                  Job Status: {job.attributes.status}
                </Card.Meta>
                </Card.Content>
              </Card>
            ))
        }
      </div>
    </>
  )
  
}
