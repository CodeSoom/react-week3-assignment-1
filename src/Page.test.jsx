import { render } from '@testing-library/react';
import { isDOMComponent } from 'react-dom/test-utils';

import Page from './Page';

describe('Page', () => {
  const handleChange = jest.fn();
  const handleClickAdd = jest.fn();
  const handleClickDelete = jest.fn();
  const taskTitle = '나는 타이틀';
  const tasks = [
    { id: 1, task: '코드숨 과제하기!' },
    { id: 2, task: '테스트 주도 개발 공부하기!' },
  ];

  context('when page render', () => {
    test('then Input and List render', () => {
      const { container } = render((
        <Page
          taskTitle={taskTitle}
          onChangeTitle={handleChange}
          onClickAddTask={handleClickAdd}
          onClickDeleteTask={handleClickDelete}
          tasks={tasks}
        />
      ));

      isDOMComponent(container);
      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('완료');
    });
  });
});
