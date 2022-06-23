import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  function renderInput() {
    return render((
      <Input
        onChange={handleChange}
        onClick={handleClick}
      />
    ));
  }

  beforeEach(() => jest.clearAllMocks());

  it('input과 button이 보인다', () => {
    const { container } = renderInput();

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('입력창에 입력하면 handleChange가 실행되며 입력값이 보여진다.', () => {
    const { getByLabelText } = renderInput();

    expect(handleChange).not.toBeCalled();

    fireEvent.change(getByLabelText('할 일'), { target: { value: '뭐라도 하기' } });

    expect(handleChange).toBeCalled();
    expect(getByLabelText('할 일').value).toBe('뭐라도 하기');
  });

  it('"추가" 버튼을 누르면 입력 창에 "할 일을 입력해 주세요" 라는 문구가 보인다', () => {
    const { getByText, getByPlaceholderText } = renderInput();

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
  });
});
