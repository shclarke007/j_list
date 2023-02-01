import React from "react";
import { Container } from 'semantic-ui-react';

/**
 * It returns a Container component with a centered text that says "Job list"
 * @returns A container with a centered header
 */

export const Nav = () => {
  return (
    <Container textAlign='center'>
      <h1>Job list</h1>
    </Container>
  )
}
