import { render, screen } from '@testing-library/react';
import SavingsDetailsCard from './SavingsDetailsCard';
import { SavingsFrequency } from '../../../../types/savingsType';

test('renders learn react link', () => {
  render(<SavingsDetailsCard data={{
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
