import { render } from '@testing-library/react';
import Input from './Input';

test('Inputting test!', () => {
  const value = '페이지 테스트하기';
  const onChange = jest.fn();
  const onClick = jest.fn();

  const { container } = render((
    <Input
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
  // expect(container).toHaveValue(document.getElementById('input-task-title'));
});
