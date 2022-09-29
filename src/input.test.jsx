import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('InputTest', () => {
  const onClick = jest.fn();
  const onChange = jest.fn();

  const { container, getByText } = render((
    <Input
      onClick={onClick}
      onChange={onChange}
    />
  ));

  expect(container).toHaveTextContent('할 일');

  expect(onClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(onClick).toBeCalled();
});
