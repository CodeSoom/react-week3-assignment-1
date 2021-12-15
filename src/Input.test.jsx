import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input Component', () => {
  const value = '아무것도 하지 않기';
  const onChange = jest.fn();
  const onClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => render((
    <Input
      value=""
      onChange={onChange}
      onClick={onClick}
    />
  ));

  it('render', () => {
    const { container, getByPlaceholderText } = renderComponent();

    expect(container).toHaveTextContent('할 일');
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    expect(container).toHaveTextContent('추가');
  });

  it('when typing, input changed value', () => {
    const { getByPlaceholderText } = renderComponent();
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value,
      },
    });

    expect(onChange).toBeCalled();
  });

  it('after typing, click button to init value', () => {
    const { getByPlaceholderText, getByRole } = renderComponent();
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value,
      },
    });

    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
