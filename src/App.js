import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { JobsList } from './components/jobs-list';

const client = new QueryClient();

/**
 * We're using the QueryClientProvider component to wrap our Router component, which in turn wraps our
 * Routes component, which in turn wraps our Route component, which in turn wraps our JobsList
 * component
 * @returns A React component that renders a router with a route that renders a JobsList component.
 */

const App = () => {
  return (
  <QueryClientProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' element={<JobsList/>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
