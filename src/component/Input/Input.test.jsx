import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input.jsx', () => {
  const taskTitle = '';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  beforeEach(() => {
    render(
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />,
    );
  });

  describe('test add button', () => {
    it('button renders', () => {
      expect(screen.getByRole('button', { name: '추가' })).toBeInTheDocument();
    });

    it('button works', () => {
      expect(onClickAddTask).not.toBeCalled();

      userEvent.click(screen.getByRole('button', { name: '추가' }));

      expect(onClickAddTask).toBeCalledTimes(1);
    });
  });

  describe('test inputbox', () => {
    it('inputbox renders', () => {
      expect(screen.getByRole('textbox', { name: '할 일' })).toBeInTheDocument();
    });

    context('before type', () => {
      it('onChange call X', () => {
        expect(onChangeTitle).not.toBeCalled();
      });
      it('empty input', () => {
        expect(screen.getByRole('textbox', { name: '할 일' })).toHaveValue('');
      });
    });

    context('after type', () => {
      it('onChange call O', () => {
        userEvent.type(screen.getByRole('textbox'), 'abcd');
        expect(onChangeTitle).toBeCalledTimes(4);
      });
    //   it('filled input', () => {
    //     userEvent.type(screen.getByRole('textbox'), 'abcd');
    //     expect(screen.getByRole('textbox', { name: '할 일' })).toHaveValue('abcd');
    //   });
    });
  });
});
