import React from 'react';

import { render } from '@testing-library/react';

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
  });
});
