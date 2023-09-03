import { render, screen } from '@testing-library/react';
import SelectableList from './SelectableList';

test('renders learn react link', () => {
  render(<SelectableList/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
