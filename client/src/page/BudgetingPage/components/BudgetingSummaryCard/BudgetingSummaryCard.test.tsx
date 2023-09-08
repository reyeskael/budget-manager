import { render, screen } from '@testing-library/react';
import BudgetingSummaryCard from './BudgetingSummaryCard';

test('renders learn react link', () => {
  render(<BudgetingSummaryCard data={{}}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
