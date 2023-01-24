import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { JobsList } from './components/jobs-list';

const client = new QueryClient();

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
