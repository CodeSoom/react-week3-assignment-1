import { useState } from 'react';

import { fireEvent, render } from '@testing-library/react';

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

const setUp = () => {
  const utils = render(<MockInput />);
  const input = utils.getByRole('textbox');

  return {
    input, utils,
  };
};

describe('Input Test', () => {
  context('Input 컴포넌트 기능 테스트', () => {
    it('Input에 값을 입력할 수 있어야 한다.', () => {
      const { input } = setUp();

      fireEvent.change(input, { target: { value: '뭐라도 하기' } });
      expect(input.value).toBe('뭐라도 하기');
    });

    it('추가 버튼을 눌렀을 때 Input의 입력창이 초기화 되어야 한다.', () => {
      const { input, utils } = setUp();

      fireEvent.change(input, { target: { value: '뭐라도 하기' } });
      fireEvent.click(utils.getByText('추가'));
      expect(input.value).toBe('');
    });
  });
});
