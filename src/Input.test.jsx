import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  const state = {
    title: '',
  };
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { getByPlaceholderText, getByText } = render((
    <Input
      value={state.title}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  it('input의 placeholder는 "할 일을 입력해 주세요" 이다.', () => {
    const inputElement = getByPlaceholderText('할 일을 입력해 주세요');
    expect(inputElement).toHaveValue('');
  });

  it('"추가" 버튼은 클릭 이벤트를 실행해야 한다.', () => {
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled(1);
  });
});
