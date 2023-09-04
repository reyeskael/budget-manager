import { render, screen } from '@testing-library/react';
import FormWindow from './FormWindow';

test('renders learn react link', () => {
  render(<FormWindow title="" items={[]}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
