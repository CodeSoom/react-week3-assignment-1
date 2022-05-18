import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  const renderInput = (taskTitle) => render((
    <Input
      value={taskTitle}
      onChange={handleChangeTitle}
      onClick={handleClickAddTask}
    />
  ));

  context('텍스트를 입력할 때', () => {
    const taskTitle = '아무거나 입력하기';

    it('인풋창에 입력한 텍스트가 표시된다', () => {
      const { getByPlaceholderText } = renderInput(taskTitle);

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: taskTitle } });
      expect(input).toHaveAttribute('value', taskTitle);
    });
  });

  context('추가 버튼을 클릭할 때', () => {
    it('handleClickAddTask 함수가 호출된다', () => {
      const { getByText } = renderInput();

      expect(handleClickAddTask).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalled();
    });
  });
});
