import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleClick.mockClear();
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
        onChange={handleChange}
      />
    ));

    it('입력창에 "숨쉬기" 라는 문구가 보인다.', () => {
      const newContents = '숨쉬기';

      const inputEl = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(inputEl, { target: { value: newContents } });

      expect(inputEl.value).toBe(newContents);
    });
  });
});
