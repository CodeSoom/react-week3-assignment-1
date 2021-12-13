import { render } from '@testing-library/react';
import List from './List';

test('List empty', () => {
  const { container } = render(<List tasks={[]} />);
  expect(container).toHaveTextContent('할 일이 없어요!');
});
