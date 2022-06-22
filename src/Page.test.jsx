import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  context('페이지 렌더링 완료', () => {
    it('페이지의 요소들이 맞는지 확인', () => {
      const taskTitle = '테스크';
      const tasks = [{ id: 1, title: '너무 어렵네요' }];

      const handleChangeTitle = jest.fn();
      const handleClickAddTask = jest.fn();
      const handleClickDeleteTask = jest.fn();

      const { container } = render((<Page
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />));

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('너무 어렵네요');
      expect(container).toHaveTextContent('완료');
    });
  });
});
