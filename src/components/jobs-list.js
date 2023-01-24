import React from 'react';
import { useJobs } from '../main/queries/use-jobs';
import { Nav } from './nav';
import { Card, Image, Icon, Container, Divider } from 'semantic-ui-react';

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
      <Container fluid>
        {
          data?.map((job) => (
            <Card key={job.id}>
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
                <a href={'job.links.careersite-job-url'}>
                  <Icon name='arrow circle right'/>
                  View More
                </a>
              </Card.Content>
              </Card>
            ))
        }
      </Container>
    </>
  )
  
}
