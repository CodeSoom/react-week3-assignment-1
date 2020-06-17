import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

const onChangeTitle = jest.fn();
const onClickAddTask = jest.fn();
const onClickDeleteTask = jest.fn();

function createPage(taskTitle, tasks) {
  return render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      tasks={tasks}
      onClickDeleteTask={onClickDeleteTask}
    />
  ));
}

describe('Page', () => {
  context('공통적으로', () => {
    it('제목을 볼 수 있다.', () => {
      const { container } = createPage('', []);

      expect(container).toHaveTextContent('To-do');
    });

    it('추가 버튼을 볼 수 있다.', () => {
      const { container } = createPage('', []);

      expect(container).toHaveTextContent('추가');
    });

    it('할 일 목록을 볼 수 있다.', () => {
      const { container } = createPage('', []);

      expect(container).toHaveTextContent('할 일');
    });

    it('추가할 일을 입력할 수 있다.', () => {
      const palceHolderText = '할 일을 입력해 주세요';
      const taskTitle = '이걸 추가할거다.';

      const { getByPlaceholderText } = createPage(taskTitle, []);

      expect(getByPlaceholderText(palceHolderText)).toContainHTML(taskTitle);
    });
  });

  context('할 일 목록이 없으면', () => {
    it('비어있는 목록을 볼 수 있다.', () => {
      const { container } = createPage('', []);

      expect(container).toHaveTextContent('할 일이 없어요');
    });

    it('완료 버튼을 볼 수 없다.', () => {
      const { container } = createPage('', []);

      expect(container).not.toHaveTextContent('완료');
    });
  });

  context('할 일 목록이 있으면', () => {
    it('할 일을 볼 수 있다.', () => {
      const tasks = [{
        id: 1,
        title: '테스트 도전하기',
      }];

      const { container } = createPage('', tasks);

      expect(container).toHaveTextContent('테스트 도전하기');
    });

    it('완료 버튼을 볼 수 있다.', () => {
      const tasks = [{
        id: 1,
        title: '테스트 도전하기',
      }];

      const { container } = createPage('', tasks);

      expect(container).toHaveTextContent('완료');
    });
  });
});
