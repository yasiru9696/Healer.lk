import { render, screen } from '@testing-library/react';
import Booking from './Booking';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);

test('renders booking form with time constraints', () => {
  render(<Booking />);

  const timeInput = screen.getByLabelText(/Preferred Time \*/i);

  expect(timeInput).toHaveAttribute('min', '09:00');
  expect(timeInput).toHaveAttribute('max', '17:00');
});