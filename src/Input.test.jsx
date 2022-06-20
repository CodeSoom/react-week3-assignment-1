import { render } from '@testing-library/react';
import Input from './Input';

test('input', () => {
  const taskTitle = '안녕';

  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container } = render(
    <Input
      value={taskTitle}
      onChange={handleChange}
      onClick={handleClick}
    />,
  );

  expect(container).toHaveTextContent('할 일추가');

//   fireEvent.click(getByText('추가'));
});
