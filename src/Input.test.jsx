import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const onChange = jest.fn();
const onClick = jest.fn();

const testValue = '123';

const renderInputTemplate = (value = '') => render((
  <Input value={value} onChange={onChange} onClick={onClick} />
));

describe('Input Component', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders a button with 추가 text', () => {
    const { getByText } = renderInputTemplate();

    const addButton = getByText('추가');

    expect(addButton).toHaveTextContent('추가');
  });

  it('renders a input control', () => {
    const { getByLabelText } = renderInputTemplate();

    const input = getByLabelText('input-task');

    expect(input).toHaveValue('');
  });

  it('renders a label element', () => {
    const { getByText } = renderInputTemplate();

    const label = getByText('할 일');

    expect(label).toHaveTextContent('할 일');
  });

  context('with value', () => {
    it('displays value', () => {
      const { getByLabelText } = renderInputTemplate(testValue);

      const input = getByLabelText('input-task');

      expect(input).toHaveDisplayValue('123');
    });

    it('add button has event', () => {
      const { getByText } = renderInputTemplate();

      const addButton = getByText('추가');

      expect(onClick).not.toBeCalled();

      fireEvent.click(addButton);

      expect(onClick).toBeCalled();
    });
  });
  context('when typing on input', () => {
    it('onChange event is called', () => {
      const { getByLabelText } = renderInputTemplate(testValue);

      fireEvent.change(getByLabelText('input-task'), { target: { value: 'a' } });

      expect(onChange).toBeCalled();
    });
  });
});
