import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Page from './Page';

function setup(taskTitle, handleChangeTitle,
  handleClickAddTask, tasks, handleClickDeleteTask) {
  render(<Page
    taskTitle={taskTitle}
    onChangeTitle={handleChangeTitle}
    onClickAddTask={handleClickAddTask}
    tasks={tasks}
    onClickDeleteTask={handleClickDeleteTask}
  />);
  const changeTaskInput = (text) => fireEvent.change(screen.getByLabelText(/할 일/i, { selector: 'input' }),
    { target: { value: text } });
  const clickAddButton = () => fireEvent.click(screen.getByRole('button', { name: /추가/i }));
  const clickDoneButton = () => fireEvent.click(screen.getAllByRole('button', { name: /완료/i })[0]);
  return { changeTaskInput, clickAddButton, clickDoneButton };
}

describe('Page Component는', () => {
  const mockHandleChangeTitle = jest.fn();
  const mockHandleClickAddTask = jest.fn();
  const mockHandleClickDeleteTask = jest.fn();

  beforeEach(() => {
    mockHandleChangeTitle.mockClear();
    mockHandleClickAddTask.mockClear();
    mockHandleClickDeleteTask.mockClear();
  });

  describe('taskTitle 값이', () => {
    describe('비어 있다면', () => {
      test('입력 안내 메시지를 출력한다', () => {
        const placeholderText = '할 일을 입력해 주세요';
        setup('', mockHandleChangeTitle,
          mockHandleClickAddTask, [], mockHandleClickDeleteTask);
        expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
      });
    });

    describe('비어 있지 않다면', () => {
      test('taskTitle 값을 출력한다.', () => {
        const taskTitle = '어제보다 열심히 하기';
        setup(taskTitle, mockHandleChangeTitle,
          mockHandleClickAddTask, [], mockHandleClickDeleteTask);
        expect(screen.getByDisplayValue(taskTitle)).toBeInTheDocument();
      });
    });
  });

  describe('텍스트를 입력하면', () => {
    test('onChangeTitle를 실행한다', () => {
      const { changeTaskInput } = setup('어제보다 열심히 하기', mockHandleChangeTitle,
        mockHandleClickAddTask, [], mockHandleClickDeleteTask);
      changeTaskInput('새롭게 해야할 일');
      expect(mockHandleChangeTitle).toBeCalledTimes(1);
    });
  });

  describe('추가 버튼을 누르면', () => {
    test('onClickAddTask을 실행한다', () => {
      const { clickAddButton } = setup('어제보다 열심히 하기', mockHandleChangeTitle,
        mockHandleClickAddTask, [], mockHandleClickDeleteTask);
      clickAddButton();
      expect(mockHandleClickAddTask).toBeCalledTimes(1);
    });
  });

  describe('할 일이 없다면', () => {
    test('안내 메시지를 출력한다', () => {
      const message = '할 일이 없어요!';
      setup('', mockHandleChangeTitle,
        mockHandleClickAddTask, [], mockHandleClickDeleteTask);
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    test('출력되는 Item이 없다', () => {
      setup('', mockHandleChangeTitle,
        mockHandleClickAddTask, [], mockHandleClickDeleteTask);
      expect(screen.queryByRole('listitem', { name: '' })).not.toBeInTheDocument();
    });
  });

  describe('할 일이 있다면', () => {
    const itemSize = 10;
    const tasks = [...Array(itemSize)].map((value, index) => ({ id: index + 1, title: `${index} 할 일` }));
    test('Item 리스트를 출력한다', () => {
      setup('', mockHandleChangeTitle,
        mockHandleClickAddTask, tasks, mockHandleClickDeleteTask);
      expect(screen.getByRole('list', { name: '' }).children).toHaveLength(itemSize);
    });

    describe('Item의 완료 버튼을 클릭했을 때', () => {
      test('onClickDeleteTask 실행한다', () => {
        const { clickDoneButton } = setup('', mockHandleChangeTitle,
          mockHandleClickAddTask, tasks, mockHandleClickDeleteTask);
        clickDoneButton();
        expect(mockHandleClickDeleteTask).toBeCalledTimes(1);
      });
    });
  });
});
