import React from 'react';
import { Modal, Button, Icon, Image, Form } from 'semantic-ui-react';
import parse from 'html-react-parser';

/**
 * We have a modal that opens when the user clicks on the "Show more" button. This modal contains a
 * button that opens another modal to submit application
 * @returns A modal with a button that opens another modal.
 */

export const JobItem = ({ job }) => {
  const [firstOpen, setFirstOpen] = React.useState(false)
  const [secondOpen, setSecondOpen] = React.useState(false)

  return (
    <Modal
      closeIcon
      onClose={() => setFirstOpen(false)}
      onOpen={() => setFirstOpen(true)}
      open={ firstOpen }
      trigger={
        <Button color='orange' onClick={ () => setFirstOpen(true) }> View more <Icon name='arrow right'/></Button>
      }
    >
      <Modal.Header>
        <Image src={ job.attributes.picture.standard } />
        <h2>{ job.attributes.title}</h2>
      </Modal.Header>
      <Modal.Content>
        {parse(job.attributes.body)}
      </Modal.Content>
       <Modal.Actions>
        <Button
          color='orange'
          onClick={() => setSecondOpen(true)}>
          { job.attributes['apply-button-text'] }
          <Icon name='right chevron' />
        </Button>
      </Modal.Actions>
      <Modal
        onClose={() => setSecondOpen(false)}
        open={secondOpen}
        size='small'
        closeIcon
        >
          <Modal.Header>Enter Details</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>First Name</label>
                <input placeholder='First Name' />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input placeholder='Last Name' />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
          <Button
            primary
            icon='check'
            content='Submit Application'
            onClick={() => setSecondOpen(false)}
            />
          </Modal.Actions>
        </Modal>
    </Modal>
  )
}
