import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  function renderInput(taskTitle = '') {
    return render((
      <Input
        value={taskTitle}
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

  it('input의 value가 보인다.', () => {
    const { getByDisplayValue } = renderInput('기존 할 일');
    expect(getByDisplayValue('기존 할 일')).not.toBeNull();
  });

  it('입력창에 입력하면 handleChange가 실행된다.', () => {
    const { getByLabelText } = renderInput();

    fireEvent.change(getByLabelText('할 일'), { target: { value: '뭐라도 하기' } });

    expect(handleChange).toBeCalled();
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
