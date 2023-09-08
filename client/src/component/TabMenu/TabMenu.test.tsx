import { render, screen } from '@testing-library/react';
import TabMenu from './TabMenu';

test('renders learn react link', () => {
  render(<TabMenu items={[]}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
