import { render, screen } from '@testing-library/react';
import SavingsPage from './SavingsPage';

test('renders learn react link', () => {
  render(<SavingsPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
