import { render, screen } from '@testing-library/react';
import ListBox from './ListBox';
import { MenuType } from '../../types/menuItemTypes';

test('renders learn react link', () => {
  render(<ListBox items={[{text: MenuType.SAVINGS}]} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
