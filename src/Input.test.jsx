import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

function renderInput(value, onChange, onClick) {
  return render((
    <Input
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  ));
}

describe('Input', () => {
  const value = '';

  const onChange = jest.fn();
  const onClick = jest.fn();

  context('when it renders', () => {
    it('renders a label, an input, and a button', () => {
      const { container } = renderInput(value, onChange, onClick);

      expect(container).toContainHTML('<label');
      expect(container).toHaveTextContent('할 일');

      expect(container).toContainHTML('<input');

      expect(container).toContainHTML('<button');
      expect(container).toHaveTextContent('추가');
    });
  });

  context('when a new task is input', () => {
    const newValue = '공부하기';

    it('calls change handler', () => {
      const { getByLabelText } = renderInput(value, onChange, onClick);

      expect(onChange).not.toBeCalled();

      fireEvent.change(getByLabelText('할 일'), { target: { value: newValue } });

      expect(onChange).toBeCalled();
    });
  });

  context('when 추가 button is clicked', () => {
    it('calls click handler', () => {
      const { getByText } = renderInput(value, onChange, onClick);

      expect(onClick).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(onClick).toBeCalled();
    });
  });
});
