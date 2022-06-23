import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  const rendereInput = () => render(
    <Input
      onClick={onClickAddTask}
      onChangeTitle={onChangeTitle}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();

    rendereInput();
  });

  describe('Input이 렌더링 되면', () => {
    const { container, getByText, getByPlaceholderText } = rendereInput();

    it('label이 보입니다.', () => {
      expect(container).toHaveTextContent('할 일');
    });

    it('button이 보입니다.', () => {
      expect(getByText('추가')).toBeInTheDocument();
    });

    it('input이 보입니다.', () => {
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    });
  });

  describe('유저가 "숨쉬기" 라는 할 일을 입력하면', () => {
    const newContents = '숨쉬기';
    const { getByPlaceholderText } = rendereInput();

    it('입력창에 "숨쉬기" 라는 문구가 보입니다.', () => {
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: newContents } });

      expect(input.value).toBe(newContents);
    });
  });

  describe('유저가 "추가"', () => {
    const { getByText } = rendereInput();
    context('버튼을 클릭하면', () => {
      it('onClickAddTask함수가 호출됩니다.', () => {
        fireEvent.click(getByText('추가'));

        expect(onClickAddTask).toBeCalledTimes(1);
      });
    });
    context('버튼을 클릭하지 않는다면', () => {
      it('onClickAddTask함수가 호출되지 않습니다.', () => {
        expect(onClickAddTask).not.toBeCalled();
      });
    });
  });
});
