import { render, screen } from 'test/utilities';
import { PackingList } from '.';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore } from './store';

const Component = () => (
  <Provider store={createStore()}>
    <PackingList />
  </Provider>
);

it('renders the Packing List application', () => {
  render(<Component />);

  const title = screen.getByText(/packing list/i);

  expect(title).toBeInTheDocument();
});

it('has the correct title', async () => {
  render(<Component />);
  const title = screen.getByText('Packing List');
  expect(title).toBeInTheDocument();
});

it('has an input field for a new item', () => {
  render(<Component />);

  const input = screen.getByPlaceholderText('New Item');
  // screen.getByRole('input', {placeholder: 'Add New Item'});

  expect(input).toBeInTheDocument();
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<Component />);
  const button = screen.getByRole('button', { name: 'Add New Item' });
  const input = screen.getByPlaceholderText('New Item');

  expect(input).toHaveValue('');
  expect(button).toBeDisabled();
});

it.todo(
  'enables the "Add New Item" button when there is text in the input field',
  async () => {
    const user = userEvent.setup();

    render(<Component />);
    const button = screen.getByRole('button', { name: 'Add New Item' });
    const input = screen.getByPlaceholderText('New Item');

    expect(input).toHaveValue('');
    expect(button).toBeDisabled();

    const inputValue = 'Lucky beanie';

    await user.type(input, inputValue);

    expect(input).toHaveValue(inputValue);
    expect(button).toBeEnabled();
  },
);

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const user = userEvent.setup();

  render(<Component />);

  const button = screen.getByRole('button', { name: 'Add New Item' });
  const input = screen.getByPlaceholderText('New Item');
  const unpackedList = screen.getByTestId('unpacked-items-list');

  const inputValue = 'Lucky beanie';

  await user.type(input, inputValue);
  await user.click(button);

  const newItem = screen.getByText(inputValue);

  expect(input).toHaveValue('');
  expect(unpackedList).toContainElement(newItem);
  expect(newItem).not.toBeChecked();
});
