import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input Component', () => {
  const value = '아무것도 하지 않기';
  const onChange = jest.fn();
  const onClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render', () => {
    const { container, getByPlaceholderText } = render((
      <Input />
    ));

    expect(container).toHaveTextContent('할 일');
    getByPlaceholderText('할 일을 입력해 주세요');
    expect(container).toHaveTextContent('추가');
  });

  it('when typing, input changed value', () => {
    const { getByPlaceholderText } = render((
      <Input value="" onChange={onChange} onClick={onClick} />
    ));

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    expect(onChange).not.toBeCalled();
    fireEvent.change(input, {
      target: {
        value,
      },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it('after typing, click button to init value', () => {
    const { getByPlaceholderText, getByRole } = render((
      <Input
        value={value}
        onChange={onChange}
        onClick={onClick}
      />
    ));

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, {
      target: {
        value: '코드숨 과제하기',
      },
    });

    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
