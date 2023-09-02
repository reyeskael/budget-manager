import { render, screen } from '@testing-library/react';
import ListBox from './ListBox';

test('renders learn react link', () => {
  render(<ListBox items={[{text: "Test"}]} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
