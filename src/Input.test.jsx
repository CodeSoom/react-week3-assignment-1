import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  context('when it renders', () => {
    it('renders a label, an input, and a button', () => {
      const { container } = render((<Input />));

      expect(container).toContainHTML('<label');
      expect(container).toHaveTextContent('할 일');

      expect(container).toContainHTML('<input');

      expect(container).toContainHTML('<button');
      expect(container).toHaveTextContent('추가');
    });
  });

  context('when a new task is input', () => {
    const value = '공부하기';

    it('calls change handler', () => {
      const handleChange = jest.fn();
      const { getByLabelText } = render((
        <Input onChange={handleChange} />
      ));

      expect(handleChange).not.toBeCalled();

      fireEvent.change(getByLabelText('할 일'), { target: { value } });

      expect(handleChange).toBeCalled();
    });
  });

  context('when 추가 button is clicked', () => {
    it('calls click handler', () => {
      const handleClick = jest.fn();
      const { getByText } = render((
        <Input onClick={handleClick} />
      ));

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalled();
    });
  });
});
