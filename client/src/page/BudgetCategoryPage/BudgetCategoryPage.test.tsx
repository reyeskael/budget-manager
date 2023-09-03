import { render, screen } from '@testing-library/react';
import BudgetCategoryPage from './BudgetCategoryPage';

test('renders learn react link', () => {
  render(<BudgetCategoryPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
