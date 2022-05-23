import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input text', () => {
  const handleChangeTitle = jest.fn();

  const renderInput = (taskTitle) => render((
    <Input
      value={taskTitle}
      onChange={handleChangeTitle}
    />
  ));

  context('텍스트가 입력되지 않으면', () => {
    it('초기값이 보여진다', () => {
      const { getByPlaceholderText } = renderInput();

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      expect(input.value).toBe('');
    });
  });

  context('텍스트가 입력되면', () => {
    const taskTitle = '아무거나 입력하기';

    it('인풋창에 입력한 텍스트가 보여된다', () => {
      const { getByPlaceholderText } = renderInput(taskTitle);

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: taskTitle } });
      expect(input).toHaveAttribute('value', taskTitle);
    });
  });
});

describe('추가 버튼', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  const renderInput = (taskTitle) => render((
    <Input
      value={taskTitle}
      onChange={handleChangeTitle}
      onClick={handleClickAddTask}
    />
  ));

  context('버튼을 클릭하면', () => {
    it('handleClickAddTask 함수가 호출된다.', () => {
      const { getByText } = renderInput();

      expect(handleClickAddTask).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalled();
    });

    it('입력창은 초기화된다.', () => {
      const { getByText, getByPlaceholderText } = renderInput();

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: '아무거나 입력하기' } });
      fireEvent.click(getByText('추가'));

      expect(input).toHaveAttribute('value', '');
    });
  });
});
