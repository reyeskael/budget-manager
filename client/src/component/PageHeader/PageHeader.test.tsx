import { render, screen } from '@testing-library/react';
import PageHeader from './PageHeader';

test('renders learn react link', () => {
  render(<PageHeader title="Title" />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
