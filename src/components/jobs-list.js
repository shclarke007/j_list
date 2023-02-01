import React from 'react';
import { useJobs } from '../main/queries/use-jobs';
import { Nav } from './nav';
import { Card, Image, Divider, Grid, Header } from 'semantic-ui-react';
import { JobItem } from './job-item';
import { FavouritesList } from './favourites-list';

/**
 * We're using the useJobs hook to fetch the data from the API, and then we're using the data to render
 * a list of cards
 */

export const JobsList = () => {
  const { data, isLoading, error, isSuccess } = useJobs()

  if (isLoading) {
    return <h2>Loading...</h2>
  }
  
  if (error) {
    return <h2>{error}</h2>
  }
  
  return (
    <>
      <Nav />
      <Divider />
      <Grid columns={4} container relaxed stackable >
        { data && isSuccess && data?.length > 0 ?
          (data?.map((job) => (
            <Grid.Column key={ job.id }>
              <Card raised card orange>
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
          ))) : (<Grid.Column><h2>{'No Jobs listed'}</h2></Grid.Column>)
        }
      </Grid>
    </>
  )
  
}
