import { render, screen } from '@testing-library/react';
import ProgressWheel from './ProgressWheel';

test('renders learn react link', () => {
  render(<ProgressWheel data={{}}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
