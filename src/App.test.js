import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('calculates electricity bill correctly for 1000 units', () => {
  render(<App />);

  const input = screen.getByRole('textbox');
  const button = screen.getByText('Calculate');

  fireEvent.change(input, { target: { value: '1000' } });
  fireEvent.click(button);

  const billDisplay = screen.getByText(/Total Bill:/);
  expect(billDisplay).toHaveTextContent('₹1800.00');
});
