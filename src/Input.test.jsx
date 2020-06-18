import React from 'react';
import { render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '밥 먹고 3주차 강의 보기!';

  const onChange = jest.fn();

  const { getByPlaceholderText } = render( // 화면에 보여줌
    <Input
      value={value}
      onChange={onChange}
    />,
  );

  const input = getByPlaceholderText('할 일을 입력해 주세요');

  expect(input).toHaveAttribute('value', '밥 먹고 3주차 강의 보기!');
});
