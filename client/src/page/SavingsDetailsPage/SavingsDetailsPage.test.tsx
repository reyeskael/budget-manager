import { render, screen } from '@testing-library/react';
import SavingsDetailsPage from './SavingsDetailsPage';

test('renders learn react link', () => {
  render(<SavingsDetailsPage/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
