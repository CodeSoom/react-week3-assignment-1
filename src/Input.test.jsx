import { useState } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import Input from './Input';

const MockInput = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      value={value}
      onChange={({ target }) => setValue(target.value)}
      onClick={() => setValue('')}
    />
  );
};

describe('Input Test', () => {
  beforeEach(() => {
    render(<MockInput />);
  });

  context('Input 컴포넌트 기능 테스트', () => {
    it('Input에 값을 입력할 수 있어야 한다.', () => {
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: '뭐라도 하기' } });
      expect(input.value).toBe('뭐라도 하기');
    });

    it('추가 버튼을 눌렀을 때 Input의 입력창이 초기화 되어야 한다.', () => {
      const input = screen.getByRole('textbox');
      const button = screen.getByText('추가');

      fireEvent.change(input, { target: { value: '뭐라도 하기' } });
      fireEvent.click(button);
      expect(input.value).toBe('');
    });
  });
});
