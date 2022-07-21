import { fireEvent, render, screen } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '회고 작성하기';

  const handleClick = jest.fn();

  const { getByText } = render(<Input onClick={handleClick} value={value} />);

  // <input>에 텍스트 입력 시 <input>에 작성한 value가 보여지기
  screen.getByDisplayValue(value);

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가')); // 추가 버튼 클릭

  expect(handleClick).toBeCalled(); // 이벤트 실행 확인 (통과)

  // screen.getByDisplayValue(''); // 추가 버튼을 클릭 하는 이벤트 실행됐음에도 왜 input의 value가 ''이 아닌가?
});

// Input의 기능
// - <input>에 텍스트 입력 시 <input>에 작성한 value가 보여지기
// - 추가 버튼 클릭 시 <input>의 텍스트 삭제 및 버튼 비활성화
