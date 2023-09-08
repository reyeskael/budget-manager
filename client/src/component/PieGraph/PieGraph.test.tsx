import { render, screen } from '@testing-library/react';
import PieGraph from './PieGraph';

test('renders learn react link', () => {
  render(<PieGraph data={{}}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
