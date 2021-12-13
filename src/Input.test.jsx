import { render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '할 일을 입력했다!';
  const onChange = jest.fn();
  const onClick = jest.fn();

  const { container } = render((
    <Input
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  ));

  expect(
    container.querySelector('[id="input-task-title"]'),
  ).toHaveValue({ value });
  // querySelector를 이용해도 내부에 접근할 수 없다..!
});
