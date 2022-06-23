import { render } from '@testing-library/react';

import Input from './Input';

test('test value on Input', () => {
  const value = 'react 과제 제출 하기';

  function onChange() {}
  function onClick() {}
  const { container } = render(<Input onChange={onChange} onClick={onClick} />);
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  //   expect(container).toHaveTextContent('react 과제 제출 하기');
});
