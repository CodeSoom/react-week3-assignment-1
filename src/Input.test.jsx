import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';


describe('<Input />', () => {
  const handleChangeInput = jest.fn();
  const handleClickButton = jest.fn();

  const renderComponent = () => render((
    <Input
      value=""
      onChange={handleChangeInput}
      onClick={handleClickButton}
    />
  ));

  context('input box', () => {
    it('fire change event', () => {
      const { getByRole } = renderComponent();
      const input = getByRole('textbox');
      expect(handleChangeInput).not.toBeCalled();
      fireEvent.change(input, { target: { value: '뭐라도 하기' } });
      expect(handleChangeInput).toBeCalled();
    });
  });

  context('button', () => {
    it('fire click event', () => {
      const { getByRole } = renderComponent();
      const button = getByRole('button');
      expect(handleClickButton).not.toBeCalled();
      fireEvent.click(button);
      expect(handleClickButton).toBeCalled();
    });
  });
});
