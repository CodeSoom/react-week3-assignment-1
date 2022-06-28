import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  const renderElement = (
    <Input
      onChange={handleChangeTitle}
      onClick={handleClickAddTask}
    />
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Input과 버튼이 있는가', () => {
    const { getByText, getByPlaceholderText } = render(renderElement);

    getByPlaceholderText('할 일을 입력해 주세요');
    getByText('추가');
  });

  describe('사용자가 텍스트를 입력하면', () => {
    it('handleChange 함수가 호출되는가', () => {
      const { getByPlaceholderText } = render(renderElement);
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      input.onChange = handleChangeTitle;

      fireEvent.change(input, {
        target: { value: 'test' },
      });

      expect(input.value).toEqual('test');
      expect(handleChangeTitle).toHaveBeenCalled();
    });
  });

  describe('사용자가 추가 버튼을 누르면', () => {
    it('onClick 함수가 호출되는가', () => {
      const { getByText, getByPlaceholderText } = render(renderElement);
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(handleClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalled();
      expect(input).toHaveAttribute('value', '');
    });
  });
});
