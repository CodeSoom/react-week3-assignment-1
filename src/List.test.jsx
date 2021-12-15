import { render } from '@testing-library/react';
import List from './List';

test('task의 length가 0일 때 \'할 일이 없어요!\'', () => {
  const tasks = [];
  const { container } = render(<List tasks={tasks} />);

  expect(container).toHaveTextContent('할 일이 없어요!');
});
