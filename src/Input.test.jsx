import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  context('with nothing', () => {
    it('renders empty text', () => {
      const { container } = render((
        <Input
          onChange={handleChangeTitle}
          onClick={handleClickAddTask}
        />
      ));
      const inputBox = container.querySelector('#input-task-title');

      expect(container).toHaveTextContent('할 일');
      expect(inputBox).toBeInTheDocument();
      expect(container).toHaveTextContent('추가');
      expect(inputBox.value).toBe('');

      expect(handleChangeTitle).not.toBeCalled();
      expect(handleClickAddTask).not.toBeCalled();
    });
  });

  context('with input texts', () => {
    const userInputText = 'Distribute new version';

    it('renders texts that user input', () => {
      const userInputEvent = { target: { value: userInputText } };
      const { container } = render((
        <Input
          onChange={handleChangeTitle}
          onClick={handleClickAddTask}
        />
      ));
      const inputBox = container.querySelector('#input-task-title');

      fireEvent.change(inputBox, userInputEvent);
      expect(inputBox.value).toBe(userInputText);
      expect(handleChangeTitle).toBeCalledTimes(1);
      expect(handleClickAddTask).not.toBeCalled();
    });

    it('can clicked by user', () => {
      const { getByText } = render((
        <Input
          value={userInputText}
          onChange={handleChangeTitle}
          onClick={handleClickAddTask}
        />
      ));

      fireEvent.click(getByText('추가'));
      expect(handleChangeTitle).toBeCalledTimes(1);
      expect(handleClickAddTask).toBeCalledTimes(1);
    });
  });
});
