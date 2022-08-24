import React from 'react';
import './App.css';
import Table from './components/Table';
import Form from './components/Form';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <div>
      <AppProvider>
        <Form />
        <Table />
      </AppProvider>
    </div>
  );
}

export default App;
