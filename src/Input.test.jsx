import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input Test', () => {
  test('추가 버튼을 눌렀을 떄 handleClick 함수가 실행되어야 한다.', () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <Input onClick={handleClick} />,
    );

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});
