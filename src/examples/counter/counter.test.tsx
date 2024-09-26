import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';
import { render } from 'test/utilities';

test('it should render the component', () => {
  render(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const button = screen.getByRole('button', { name: /increment/i });

  expect(currentCount).toHaveTextContent('0');

  // fireEvent.click(button); // this is not accurate for the user's interaction
  await user.click(button);

  expect(currentCount).toHaveTextContent('1');
});
