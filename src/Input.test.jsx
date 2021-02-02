import React from 'react';

import { getByLabelText, render } from '@testing-library/react';

import Input from './Input';

const onChange = jest.fn();
const onClick = jest.fn();

const renderInputTemplate = (value = '') => render((
  <Input value={value} onChange={onChange} onClick={onClick} />
));

describe('Input Component', () => {
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
      const { getByLabelText } = renderInputTemplate('123');
      const input = getByLabelText('input-task');
      expect(input).toHaveDisplayValue('123');
    });
  });
});
