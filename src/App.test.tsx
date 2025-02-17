import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Instagram homepage', () => {
  render(<App />);
  const linkElement = screen.getByText(/Instagram/i);
  expect(linkElement).toBeInTheDocument();
});
