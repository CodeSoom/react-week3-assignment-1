import { render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '할 일을 입력했다!';
  const onChange = jest.fn();
  const onClick = jest.fn();

  const { container, getByLabelText, getByText } = render((
    <Input
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  ));
  
  const label = getByLabelText('할 일');
  const button = getByText('추가');

  expect(label).toHaveTextContent("할 일을 입력해 주세요");
});
