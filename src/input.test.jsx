import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const newTodo = '';

  const setNewTodos = jest.fn();

  const addTodo = jest.fn();

  const inputComponentRender = () => render(<Input value={newTodo} onChange={setNewTodos} onClick={addTodo} />);

  context('first rending', () => {
    it('renders label with text', () => {
      const { getByLabelText } = inputComponentRender();
      expect(getByLabelText('할 일')).toBeInTheDocument();
    });

    it('renders input', () => {
      const { getByPlaceholderText } = inputComponentRender();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
    });

    it('renders button', () => {
      const { getByRole } = inputComponentRender();
      expect(getByRole('button')).toBeInTheDocument();
    });
  });
  context('typing newTodo at input box', () => {
    it('setNewTodos to be called', () => {
      const { getByRole } = inputComponentRender();
      fireEvent.change(getByRole('textbox'), { target: { value: 'newTodo' } });
      expect(setNewTodos).toBeCalled();
    });
  });

  context('click button after typing', () => {
    it('addTodo to be called', () => {
      const { getByRole } = inputComponentRender();
      fireEvent.click(getByRole('button'));
      expect(addTodo).toBeCalled();
    });
  });
});
