import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Page from './Page';

describe('Page', () => {
  it('No Todo & Input test', () => {
    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const todos = [];
    const { container, getByText } = render((
      <Page
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={todos}
      />
    ));

    const inputBox = container.querySelector('#input-task-title');

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(inputBox).toBeInTheDocument();
    expect(container).toHaveTextContent('추가');
    expect(inputBox.value).toBe('');

    expect(container).toHaveTextContent('할 일이 없어요!');

    expect(handleChangeTitle).not.toBeCalled();
    expect(handleClickAddTask).not.toBeCalled();

    fireEvent.change(inputBox, { target: { value: 'Distribute new version' } });
    expect(inputBox.value).toBe('Distribute new version');
    expect(handleChangeTitle).toBeCalledTimes(1);

    fireEvent.click(getByText('추가'));
    expect(handleClickAddTask).toBeCalledTimes(1);
  });

  it('Have any todos', () => {
    const todos = [
      {
        id: 1,
        title: 'Distribute new version',
      }, {
        id: 2,
        title: 'Fix critical error',
      },
    ];

    const { container } = render((
      <Page
        tasks={todos}
      />
    ));

    expect(container).toHaveTextContent('Distribute new version');
    expect(container).toHaveTextContent('Fix critical error');
  });
});
