import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const onChange = jest.fn();
  const onClick = jest.fn();

  function renderInput() {
    return render((
      <Input
        value=""
        onChange={onChange}
        onClick={onClick}
      />
    ));
  }

  it('renders a label, an input, and a button', () => {
    const { container } = renderInput();

    expect(container).toContainHTML('<label');
    expect(container).toHaveTextContent('할 일');

    expect(container).toContainHTML('<input');

    expect(container).toContainHTML('<button');
    expect(container).toHaveTextContent('추가');
  });

  context('when a new task is input', () => {
    const value = '공부하기';

    it('calls change handler', () => {
      const { getByLabelText } = renderInput();

      fireEvent.change(getByLabelText('할 일'), {
        target: { value },
      });

      expect(onChange).toBeCalledWith({ value });
    });
  });

  context('when 추가 button is clicked', () => {
    it('calls click handler', () => {
      const { getByText } = renderInput();

      fireEvent.click(getByText('추가'));

      expect(onClick).toBeCalled();
    });
  });
});
