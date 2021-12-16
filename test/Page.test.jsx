import { render } from '@testing-library/react';
import Page from '../src/Page';

test('Page', () => {
  const { container } = render(<Page tasks={[]} />);

  expect(container).not.toBe(null);
});
