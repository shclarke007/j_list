import React from 'react';
import { useJobs } from '../main/queries/use-jobs';
import { Nav } from './nav';
import { Card, Image, Divider, Grid } from 'semantic-ui-react';
import { JobItem } from './job-item';
/**
 * We're using the useJobs hook to fetch the data from the API, and then we're using the data to render
 * a list of cards
 */
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
      <Divider />
      <Grid columns={4} container relaxed stackable >
        {
          data?.map((job) => (
            <Grid.Column>
              <Card key={job.id} raised card orange>
                <Image src={job.attributes.picture.thumb} />
                <Card.Content>
                  <Card.Header>
                    {job.attributes.title}
                  </Card.Header>
                  <Card.Meta>
                    Job Status: {job.attributes.status}
                  </Card.Meta>
                  <Card.Description>
                    {job.attributes.pitch}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <JobItem job={job} />
                </Card.Content>
                </Card>
              </Grid.Column>
            ))
        }
      </Grid>
    </>
  )
  
}
