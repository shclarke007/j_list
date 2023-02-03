import React from 'react'
import { Button, Container, Modal, Grid, Card, Image } from 'semantic-ui-react'
import parse from 'html-react-parser';

/**
 * `Favourites` is a function that takes in an array of jobs and returns a modal that displays the jobs
 * in a grid
 */
export const Favourites = (favourites) => {
  const [open, setOpen] = React.useState(false)
  const favouriteJobs = JSON.parse(localStorage.getItem('favourites'))

  return (
    <>
      <Container>
        <Modal
          trigger={
            <Button
              onClick={() => setOpen(true)}
              color='red'
              content='My favourites'
              icon='heart'
              label={ { basic: true, color: 'red', pointing: 'left', content: `${favouriteJobs.length}` } }
            />  
          }
          onClose={ () => setOpen(false) }
          open={ open }
          closeIcon>
          <h2>Favourites:</h2>
          <Grid columns={4} container relaxed stackable >
            { favouriteJobs.length > 0 ?
              (favouriteJobs.map((job) => (
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
                        {parse(job.attributes.pitch)}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))) : (<Grid.Column><h2>{'No Favourites'}</h2></Grid.Column>)
            }
          </Grid>
        </Modal>
      </Container>
    </>
)}

