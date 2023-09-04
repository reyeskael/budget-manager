import { render, screen } from '@testing-library/react';
import FooterNavigation from './FooterNavigation';

test('renders learn react link', () => {
  render(<FooterNavigation/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
