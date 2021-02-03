import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const onChange = jest.fn();
const onClick = jest.fn();

const testValue = '123';

const renderInput = (value = '') => render((
  <Input value={value} onChange={onChange} onClick={onClick} />
));

describe('Input Component', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders a button with 추가 text', () => {
    const { getByText } = renderInput();

    const addButton = getByText('추가');

    expect(addButton).toHaveTextContent('추가');
  });

  it('renders a input control', () => {
    const { getByLabelText } = renderInput();

    const input = getByLabelText('input-task');

    expect(input).toHaveValue('');
  });

  it('renders a label element', () => {
    const { getByText } = renderInput();

    const label = getByText('할 일');

    expect(label).toHaveTextContent('할 일');
  });

  context('with value', () => {
    it('displays the value on input element', () => {
      const { getByLabelText } = renderInput(testValue);

      const input = getByLabelText('input-task');

      expect(input).toHaveDisplayValue('123');
    });

    it('tiggers onClick', () => {
      const { getByText } = renderInput();

      const addButton = getByText('추가');

      expect(onClick).not.toBeCalled();

      fireEvent.click(addButton);

      expect(onClick).toBeCalled();
    });
  });
  context('when a value is added to input element', () => {
    it('triggers onChange', () => {
      const { getByLabelText } = renderInput(testValue);

      fireEvent.change(getByLabelText('input-task'), { target: { value: 'a' } });

      expect(onChange).toBeCalled();
    });
  });
});
