import { render, screen } from '@testing-library/react';
import SavingsGoalCard from './SavingsGoalCard';

test('renders learn react link', () => {
  render(<SavingsGoalCard/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
