import { render, screen } from '@testing-library/react';
import SavingsGoalCard from './SavingsGoalCard';
import { SavingsFrequency } from '../../../../types/savingsType';

test('renders learn react link', () => {
  render(<SavingsGoalCard data={{
    "_id": "",
    "profileId": "",
    "name": "Confidential Fund",
		"amount": 500000000,
		"frequency": SavingsFrequency.MONTHLY,
		"dateToFinish": new Date()
  }}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
