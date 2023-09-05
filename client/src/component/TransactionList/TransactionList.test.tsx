import { render, screen } from '@testing-library/react';
import TransactionList, { TransactionDirection } from './TransactionList';

test('renders learn react link', () => {
  render(<TransactionList items={[{date: new Date(), direction: TransactionDirection.POSITIVE, amount: 10000}]}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
