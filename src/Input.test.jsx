import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  function renderInput() {
    return (
      render(
        <Input
          value="넷플릭스 보기"
          onChange={handleChange}
          onClick={handleClick}
        />,
      )
    );
  }

  it('추가버튼을 누르면 onClick함수가 실행된다', () => {
    const { getByText } = renderInput();

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();
  });

  it('value값이 변경되면 onChange함수가 실행된다 ', () => {
    const { getByDisplayValue, getByLabelText } = renderInput();

    expect(getByDisplayValue('넷플릭스 보기')).not.toBeNull();

    fireEvent.change(getByLabelText('할 일'), {
      target: {
        value: '카페 가기',
      },
    });

    expect(handleChange).toBeCalled();
  });
});
