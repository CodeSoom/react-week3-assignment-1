import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('<Page />', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const taskTitle = 'TDD 너 참 어렵다..';
  const tasks = [
    { id: 1, title: '어서와 TDD는 처음이지?' },
    { id: 2, title: '아직 시작도 안했어 ^^' },
    { id: 3, title: '재미난 TDD 출바알~' },
  ];

  const renderPage = ({ value = '', lists = [] }) => render((
    <Page
      taskTitle={value}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={lists}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  beforeEach(() => jest.clearAllMocks());

  it('renders a button with 추가 text', () => {
    const { getByText } = renderPage({});

    const addButton = getByText('추가');

    expect(addButton).toHaveTextContent('추가');
  });

  it('renders a label element', () => {
    const { getByText } = renderPage({});

    const label = getByText('할 일');

    expect(label).toHaveTextContent('할 일');
  });

  it('has placeholder attribute on input element', () => {
    const { getByLabelText } = renderPage({});

    const { placeholder } = getByLabelText('input-task');

    expect(placeholder).toBe('할 일을 입력해 주세요');
  });

  it('displays the value on input element', () => {
    const { getByLabelText } = renderPage({ value: taskTitle });

    const input = getByLabelText('input-task');

    expect(input).toHaveDisplayValue('TDD 너 참 어렵다..');
  });

  it('tiggers handleClickAddTask', () => {
    const { getByText } = renderPage({});

    const addButton = getByText('추가');

    expect(handleClickAddTask).not.toBeCalled();

    fireEvent.click(addButton);

    expect(handleClickAddTask).toBeCalled();
  });

  context('when a value is added to input element', () => {
    it('triggers handleChangeTitle', () => {
      const { getByLabelText } = renderPage({});

      fireEvent.change(getByLabelText('input-task'), { target: { value: 'a' } });

      expect(handleChangeTitle).toBeCalled();
    });
  });

  context('when type of tasks is null or undefined', () => {
    it('prompts empty message', () => {
      const { container } = renderPage({ lists: undefined });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('without tasks', () => {
    it('prompts empty message', () => {
      const { container } = renderPage({});

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('renders title of the tasks', () => {
      const { container } = renderPage({ lists: tasks });

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });

    it('renders 완료 button', () => {
      const { getAllByText } = renderPage({ lists: tasks });

      const completeButtonLength = getAllByText('완료').length;

      expect(completeButtonLength).toBe(tasks.length);
    });

    it('triggers handleClickDeleteTask attached to the button with 완료 text', () => {
      const { getAllByText } = renderPage({ lists: tasks });

      const completeButton = getAllByText('완료');

      completeButton.forEach((button) => {
        fireEvent.click(button);
      });

      expect(handleClickDeleteTask).toBeCalledWith(tasks.length);
    });
  });
});
