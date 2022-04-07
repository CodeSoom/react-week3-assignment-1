import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const onClick = jest.fn();
  const onChange = jest.fn();

  function renderInput() {
    return render((
      <Input
        value=""
        onChange={onChange}
        onClick={onClick}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and button', () => {
    const { container } = renderInput();

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('calls onchange', () => {
    const { getByRole } = renderInput();
    const inputValue = '운동 하기';

    fireEvent.change(getByRole('textbox'), { target: { value: inputValue } });
    expect(onChange).toBeCalled();
  });

  it('calls onclick', () => {
    const { getByText } = renderInput();

    fireEvent.click(getByText('추가'));
    expect(onClick).toBeCalled();
  });
});
