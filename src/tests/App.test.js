import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import testData from '../../cypress/mocks/testData';
import App from '../App';

// Para testes com API que precisem usar mock - usar o after e before each
beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(testData),
    })
  );
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('Testing the component', () => {
  test('Test if the aplication is Been Called', async ()  => {
  render(<App />)
  await waitFor(() => expect(fetch).toHaveBeenCalled());

  const rows = screen.getAllByRole('row');
  expect(rows.length).toBe(11);
});

  test('Test if the aplication works', async ()  => {
  await waitFor(() => render(<App />))

  const dataTestIdName = screen.getByTestId("name-filter");
  const dataTestIdColumn = screen.getByTestId("column-filter");
  const dataTestIdCompare = screen.getByTestId("comparison-filter");
  const dataTestIdNumber = screen.getByTestId("value-filter");
  const dataTestIdFilterButton = screen.getByTestId("button-filter");
  const dataTestIdButtonRemoveAll = screen.getByTestId("button-remove-filters");
  
  userEvent.selectOptions(dataTestIdColumn, 'diameter');
  userEvent.selectOptions(dataTestIdCompare, 'igual a');
  userEvent.type(dataTestIdNumber, '7200');
  userEvent.click(dataTestIdFilterButton);
  const removeButton = screen.getByTestId('filter');
  expect(removeButton).toBeInTheDocument();
  
  userEvent.click(dataTestIdButtonRemoveAll);
  const rowsAfterRemove = screen.getAllByRole('row');
  expect(rowsAfterRemove.length).toBe(11);
  await waitFor(() => expect(dataTestIdColumn.children.length).toBe(4));

  expect(dataTestIdName).toBeInTheDocument();
  expect(dataTestIdColumn).toBeInTheDocument();
  expect(dataTestIdCompare).toBeInTheDocument();
  expect(dataTestIdNumber).toBeInTheDocument();
  expect(dataTestIdFilterButton).toBeInTheDocument();
});

test('Test there are filter for name in the document', async ()  => {
  await waitFor(() => render(<App />))
  
  const dataTestIdName = screen.getByTestId("name-filter");
  userEvent.type(dataTestIdName, 'Tatooine');

  const rows = screen.getAllByRole('row');
  await waitFor(() => expect(rows.length).toBe(2));
});

test('Test if the column filter show one lest option after choice', async ()  => {
  await waitFor(() => render(<App />))
  
  const dataTestIdColumn = screen.getByTestId("column-filter");
  const dataTestIdCompare = screen.getByTestId("comparison-filter");
  const dataTestIdNumber = screen.getByTestId("value-filter");
  const dataTestIdFilterButton = screen.getByTestId("button-filter");
  
  userEvent.selectOptions(dataTestIdColumn, 'rotation_period');
  userEvent.selectOptions(dataTestIdCompare, 'maior que');
  userEvent.type(dataTestIdNumber, '24');
  userEvent.click(dataTestIdFilterButton);
  await waitFor(() => expect(dataTestIdColumn.children.length).toBe(4));
  // const dataTestIdButtonRemoveAll = screen.getByTestId("button-remove-filters");
  // userEvent.click(dataTestIdButtonRemoveAll);

  userEvent.selectOptions(dataTestIdColumn, 'orbital_period');
  userEvent.selectOptions(dataTestIdCompare, 'menor que');
  userEvent.type(dataTestIdNumber, '24');
  userEvent.click(dataTestIdFilterButton);
  await waitFor(() => expect(dataTestIdColumn.children.length).toBe(3));

});

test('Test click in button filter to remove works', async ()  => {
  await waitFor(() => render(<App />))

  const dataTestIdColumn = screen.getByTestId("column-filter");
  const dataTestIdCompare = screen.getByTestId("comparison-filter");
  const dataTestIdNumber = screen.getByTestId("value-filter");
  const dataTestIdFilterButton = screen.getByTestId("button-filter");
  
  userEvent.selectOptions(dataTestIdColumn, 'population');
  userEvent.selectOptions(dataTestIdCompare, 'igual a');
  userEvent.type(dataTestIdNumber, '1000');
  userEvent.click(dataTestIdFilterButton);
  const removeButton = screen.getByTestId('filter');
  expect(removeButton).toBeInTheDocument();
  userEvent.click(removeButton);
  
  const rowsAfterRemove = screen.getAllByRole('row');
  expect(rowsAfterRemove.length).toBe(11);
});
});
