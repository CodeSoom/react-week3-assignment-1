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

  context('when render', () => {
    it('add button appears', () => {
      const { getByText } = renderInputTemplate();

      const addButton = getByText('추가');

      expect(addButton).toHaveTextContent('추가');
    });
    it('input element appears', () => {
      const { getByLabelText } = renderInputTemplate();

      const input = getByLabelText('input-task');

      expect(input).toHaveValue('');
    });
    it('label element appears', () => {
      const { getByText } = renderInputTemplate();

      const label = getByText('할 일');

      expect(label).toHaveTextContent('할 일');
    });
  });
  context('with value', () => {
    it('displays value', () => {
      const { getByLabelText } = renderInputTemplate(testValue);

      const input = getByLabelText('input-task');

      expect(input).toHaveDisplayValue('123');
    });

    it('add button has event', async () => {
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
