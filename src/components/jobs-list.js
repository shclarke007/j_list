import React, { useState, useEffect } from 'react';
import { useJobs } from '../main/queries/use-jobs';
import { Nav } from './nav';
import { Card, Image, Divider, Grid, Modal, Button, Container, Icon, Popup, Loader } from 'semantic-ui-react';
import { JobItem } from './job-item';
import { Favourites } from './favourites';


/**
 * The JobsList function is a React functional component that uses the useJobs hook to fetch data from
 * the API, and then displays the data in a grid of cards
 */
export const JobsList = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { data, isLoading, error, isSuccess } = useJobs(pageNumber)
  const [favourites, setFavourites] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const jobFavourites = JSON.parse(localStorage.getItem('favourites'))
    if (jobFavourites) { 
      setFavourites(jobFavourites)
    }
  }, [])
  
  
  if (isLoading) {
    return <Loader active inline='centered' size='huge'/> 
  }
  
  if (error) {
    return <h2>{error}</h2>
  }
  
  const handleAddToFavourites = (job) => {
    if (favourites.find((favourite) => favourite.id === job.id)) {
      setMessage('Job already added to favourites')
      return
    }
      const newFavouriteList = [...favourites, job]
      setFavourites(newFavouriteList)
      saveToLocalStorage(newFavouriteList)
      setMessage('Job added to your favourites!')
  }
  
  const saveToLocalStorage = (items) => {
    localStorage.setItem("favourites", JSON.stringify(items))
  }
  
  return (
    <>
      <Nav />
      <Divider />
      <Modal.Content>
        { <Favourites favourites={ favourites } /> }
      </Modal.Content>
      <Divider />
      <Grid columns={5} container relaxed stackable >
        { isSuccess && data[0]?.length > 1 ?
          (data[0]?.map((job) => (
            <Grid.Column key={ job.id }>
              <Card raised link card orange>
                <Image src={job.attributes.picture.thumb} />
                <Card.Content>
                  <Card.Header>
                    { job.attributes.title }
                    <Popup
                      trigger={ <div><Icon name={favourites.find(favourite => favourite.id === job.id) ? 'heart' : 'heart outline'} size='small' color='red' onClick={ () => { handleAddToFavourites(job) } } /> </div>} 
                      content={message}
                      position='bottom left'
                      on='click'
                      > 
                    </Popup>
                  </Card.Header>
                  <Card.Meta>
                    Job Status: {job.attributes.status}
                  </Card.Meta>
                  <Card.Description>
                    {job.attributes.pitch}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <JobItem job={ job } />
                </Card.Content>
              </Card>
            </Grid.Column>
          ))) : (<Grid.Column><h2>{'No Jobs'}</h2></Grid.Column>)
        }
          <Container textAlign='center'>
            <h3>{ `Page ${pageNumber} -` } { data[1]['page-count'] }</h3>
            <Button primary content='Previous' icon='left arrow' labelPosition='left' onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}> 
            </Button>
            <Button primary content='Next' icon='right arrow' labelPosition='right'  onClick={ () => setPageNumber(pageNumber + 1) } disabled={ pageNumber === data[1]['page-count']}>
            </Button>
          </Container>
      </Grid>
    </>
  ) 
}
