import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  // 중복
  const value = '할 일이 없어용';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  // Given
  const { container, getByLabelText, getByText } = render(
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />,
  );

  // Then1
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  // When2 -> 인풋의 값이 그대로일때
  fireEvent.change(getByLabelText('할 일'), {
    target: { value },
  });

  // Then2 -> onChange handler는 호출되지 않는다.
  expect(handleChange).not.toBeCalled();

  // When3 -> 인풋의 값이 바뀔때
  fireEvent.change(getByLabelText('할 일'), {
    target: { value: '운동하기' },
  });

  // Then3 -> onChange handler는 호출된다.
  expect(handleChange).toBeCalled();

  // When4 -> 버튼 클릭할때
  fireEvent.click(getByText('추가'));

  // Then4 -> onClick handler는 호출된다.
  expect(handleClick).toBeCalled();
});
