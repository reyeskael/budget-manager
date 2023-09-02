import { render, screen } from '@testing-library/react';
import DropDown from './DropDown';

test('renders learn react link', () => {
  render(<DropDown options={[]}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
