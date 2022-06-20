import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();

  test('Input이 렌더링 되는지 확인합니다.', () => {
    const { getByText, getByPlaceholderText } = render((
      <Input />
    ));

    const buttonEl = getByText('추가');
    const inputEl = getByPlaceholderText('할 일을 입력해 주세요');

    // input이 존재하는지 체크합니다.
    expect(inputEl).toBeInTheDocument();
    // button이 존재하는지 체크합니다.
    expect(buttonEl).toBeInTheDocument();

    expect(inputEl.value).toBe('');
  });

  test('Input에 있는 폼에 chage event로 입력한 값이 value와 같은지 테스트합니다.', () => {
    const { getByPlaceholderText } = render(
      <Input
        onChange={handleChange}
      />,
    );

    const inputEl = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(inputEl, { target: { value: '추가' } });

    expect(inputEl.value).toBe('추가');
  });
});
