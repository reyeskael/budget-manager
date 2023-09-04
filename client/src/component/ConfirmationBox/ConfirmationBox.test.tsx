import { render, screen } from '@testing-library/react';
import ListBox from './ConfirmationBox';

test('renders learn react link', () => {
  render(<ListBox open={true} title="Test title" text="Test text" />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
