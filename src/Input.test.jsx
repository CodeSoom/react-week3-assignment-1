import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  beforeEach(() => {
    onChangeTitle.mockClear();
    onClickAddTask.mockClear();
    render((
      <Input />
    ));
  });

  context('Input이 렌더링 됩니다.', () => {
    const { container, getByText, getByPlaceholderText } = render((
      <Input />
    ));

    it('label이 존재합니다.', () => {
      expect(container).toHaveTextContent('할 일');
    });

    it('button이 존재합니다.', () => {
      expect(getByText('추가')).toBeInTheDocument();
    });

    it('input이 존재합니다.', () => {
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    });
  });

  context('유저가 "숨쉬기" 라는 할 일을 입력하면', () => {
    const { getByPlaceholderText } = render((
      <Input
        value="아무것도 안하기"
        onChange={onChangeTitle}
      />
    ));

    it('입력창에 "숨쉬기" 라는 문구가 보인다.', () => {
      const newContents = '숨쉬기';

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: newContents } });

      expect(input.value).toBe(newContents);
    });
  });
});
