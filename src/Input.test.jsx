import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const value = '';

  const handleChangeInput = jest.fn();
  const handleClickAddTask = jest.fn();

  const renderInput = () => render((
    <Input
      value={value}
      onChange={handleChangeInput}
      onClick={handleClickAddTask}
    />
  ));

  context('without value', () => {
    it('renders placeholder', () => {
      const { getByLabelText } = renderInput();

      expect(getByLabelText('할 일')).toBeInTheDocument();
    });
  });

  context('with value', () => {
    it('listens change event', () => {
      const { getByLabelText } = renderInput();

      fireEvent.change(getByLabelText('할 일'), { target: { value: '홈트하기' } });

      expect(handleChangeInput).toBeCalled();
    });

    it('listens "추가" button click event', () => {
      const { getByText } = renderInput();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalled();
    });
  });
});
