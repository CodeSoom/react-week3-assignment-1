import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();

  context('Input이 렌더링 됩니다.', () => {
    it('button엘리먼트와 input엘리먼트가 존재하는지 확인합니다.', () => {
      const { getByText, getByPlaceholderText } = render((
        <Input />
      ));

      const inputEl = getByPlaceholderText('할 일을 입력해 주세요');

      // input이 존재하는지 체크합니다.
      expect(inputEl).toBeInTheDocument();
      // button이 존재하는지 체크합니다.
      expect(getByText('추가')).toBeInTheDocument();

      expect(inputEl.value).toBe('');
    });
  });

  context('input엘리먼트에 새로운 컨텐츠를 입력합니다.', () => {
    it('input엘리먼트에 chage event로 입력한 값이 value와 같은지 테스트합니다.', () => {
      const newContents = '숨쉬기';

      const { getByPlaceholderText } = render(
        <Input
          onChange={handleChange}
        />,
      );

      const inputEl = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(inputEl, { target: { value: newContents } });

      expect(inputEl.value).toBe(newContents);
    });
  });
});
