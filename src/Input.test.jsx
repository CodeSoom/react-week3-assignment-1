import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const onChange = jest.fn();
const onClick = jest.fn();

it('Input', () => {
  const { container, getByText, getByPlaceholderText } = render((
    <Input
      value="테스트 코드 짜기"
      onChange={onChange}
      onClick={onClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('테스트 코드 짜기');

  expect(onClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(onClick).toBeCalled();

  expect(onChange).not.toBeCalled();

  fireEvent.change(
    getByPlaceholderText('할 일을 입력해 주세요'),
    { target: { value: '테스트 코드 작성' } },
  );

  expect(onChange).toBeCalledWith('테스트 코드 작성');
});
