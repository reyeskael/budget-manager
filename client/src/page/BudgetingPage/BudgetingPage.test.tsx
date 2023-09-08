import { render, screen } from '@testing-library/react';
import BudgetingPage from './BudgetingPage';

test('renders learn react link', () => {
  render(<BudgetingPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
