import { render, screen } from '@testing-library/react';
import SideMenu from './SideMenu';

test('renders learn react link', () => {
  render(<SideMenu/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
