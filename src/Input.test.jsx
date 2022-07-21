import { fireEvent, render, screen } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '회고 작성하기';

  const handleClick = jest.fn();

  const { getByText } = render(<Input onClick={handleClick} value={value} />);

  screen.getByDisplayValue(value);

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalled();
});

// Input의 기능
// - <input>에 텍스트 입력 시 <input>에 작성한 value가 보여지기
// - 추가 버튼 클릭 시 <input>의 텍스트 삭제 및 버튼 비활성화
