import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const task = {
    newId: 1,
    taskTitle: '할 일 1',
  };

  const { taskTitle } = task;

  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByText, getByPlaceholderText } = render((
    <Input
      value={taskTitle}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  context('when component is rendered', () => {
    it('has 할 일 and 추가 text content', () => {
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
    });
  });

  context('when user type', () => {
    it('calls handleChange function', () => {
      const inputField = getByPlaceholderText('할 일을 입력해 주세요');
      const letter = 'a';

      expect(handleChange).not.toBeCalled();
      fireEvent.change(inputField, { target: { value: letter } });
      expect(handleChange).toBeCalledTimes(1);
    });
  });

  context('when usuer click 추가 button', () => {
    it('calls handleClick function', () => {
      expect(handleClick).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClick).toBeCalled();
    });
  });
});
