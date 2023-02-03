import React from 'react'
import { Button, Container, Modal, Grid, Card } from 'semantic-ui-react'

/**
 * It's a function that takes in an array of jobs, and returns a modal that displays the jobs in the
 * array
 * @param favourites - This is the array of jobs that are in the favourites list.
 * @returns A modal with a list of jobs that have been favourited.
 */
export const Favourites = () => {
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
              label={ {
                basic: true,
                color: 'red',
                pointing: 'left',
                content: `${favouriteJobs === null ? 0 : favouriteJobs.length}`
              } }
            />  
          }
          onClose={ () => setOpen(false) }
          open={ open }
          closeIcon>
          <Modal.Header>My Favourites:</Modal.Header>
          <Modal.Content>
            { favouriteJobs?.length > 0 ?
              (favouriteJobs.map((job) => (
                <Card
                  key={ job.id }
                  color='red'
                  centered header={ job.attributes.title }
                  meta={ `Job Status: ${job.attributes.status}` }
                  link
                />
              ))) : (<Grid.Column><h2>{'No Favourites'}</h2></Grid.Column>)
            }
          </Modal.Content>
        </Modal>
      </Container>
    </>
)}

