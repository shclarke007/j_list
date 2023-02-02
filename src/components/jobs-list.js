import React, { useState } from 'react';
import { useJobs } from '../main/queries/use-jobs';
import { Nav } from './nav';
import { Card, Image, Divider, Grid, Modal, Button, Container} from 'semantic-ui-react';
import { JobItem } from './job-item';
import { Favourites } from './favourites';

/**
 * We're using the useJobs hook to fetch the data from the API, and then we're using the data to render
 * a list of cards
 */

export const JobsList = (favourites) => {
  const [pageNumber, setPageNumber] = useState(1)
  const { data, isLoading, error, isSuccess } = useJobs(pageNumber)

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
      <Modal.Content>
        { favourites && <Favourites favourites={ favourites } />}
      </Modal.Content>
      <Divider />
      <Grid columns={4} container relaxed stackable >
        { data[0] && isSuccess && data[0]?.length > 1 ?
          (data[0]?.map((job) => (
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
        <Container textAlign='center'>
          <Button primary onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}> Prev
          </Button>
          <Button primary onClick={ () => setPageNumber(pageNumber + 1) } disabled={ pageNumber !== data[1]['page-count']}> Next
          </Button>
        </Container>
        
      </Grid>
    </>
  )
  
}
