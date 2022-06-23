import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const todoTitle = '뭐라도 하기';
  const Inputplaceholder = '할 일을 입력해 주세요';

  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { getByPlaceholderText, getByText } = render((
    <Input
      value=""
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  beforeEach(() => jest.clearAllMocks());

  const addeButton = getByText('추가');

  context('할 일을 입력하기', () => {
    const input = getByPlaceholderText(Inputplaceholder);

    it('입력창에 입력한 할 일이 보인다', () => {
      expect(handleChange).not.toBeCalled();

      fireEvent.change(input, { target: { value: todoTitle } });

      expect(input).toHaveTextContent(todoTitle);
    });
  });

  context('추가 버튼을 누르기', () => {
    it('입력 창에 "할 일을 입력해 주세요" 라는 문구가 보인다', () => {
      expect(handleClick).not.toBeCalled();

      fireEvent.click(addeButton);

      expect(handleClick).toBeCalled();
      expect(handleClick).toHaveBeenCalledTimes(1);

      expect(getByPlaceholderText(Inputplaceholder)).toBeInTheDocument();
    });
  });
});
