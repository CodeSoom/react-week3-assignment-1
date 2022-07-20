import { render, screen } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '회고 작성하기';

  render(<Input value={value} />);

  screen.getByDisplayValue(value);
});

// Input의 기능
// - <input>에 텍스트 입력 시 <input>에 작성한 value가 보여지기
// - <input>에 텍스트 입력 시 추가 버튼 활성화
// - 추가 버튼 클릭 시 <input>의 텍스트 삭제 및 버튼 비활성화
