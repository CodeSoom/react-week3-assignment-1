import { render } from '@testing-library/react';

import Input from './Input';

describe('Input 관련 요소들 잘 존재하는지', () => {
  const { container, getByPlaceholderText } = render((
    <Input />
  ));
  const input = getByPlaceholderText('할 일을 입력해 주세요');

  test('placeholder is "할 일을 입력해 주세요', () => {
    expect(input).toBeDefined();
    expect(container).toHaveTextContent('추가');
  });

  // test('Button exists', () => {
  //   expect(container).toHaveTextContent('추가');
  // });
});
