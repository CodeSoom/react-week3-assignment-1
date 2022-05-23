import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  function renderPage(tasks) {
    return render(
      <Page
        tasks={tasks}
        taskTitle=""
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
      />,
    );
  }

  describe('할 일을 입력하고 추가 버튼을 누르면', () => {
    test(' 리스트가 추가된다.', () => {
      const tasks = [{ id: 0, title: '코드숨 과제하기' }];

      const { container, getByRole, getByText } = renderPage(tasks);

      expect(container).toHaveTextContent('코드숨 과제하기');

      const input = getByRole('textbox', { name: /할 일/ });
      const addButton = getByRole('button', { name: /추가/ });

      fireEvent.change(input, { target: { value: '잠자기' } });

      expect(handleChangeTitle).toHaveBeenCalled();

      fireEvent.click(addButton);

      expect(handleClickAddTask).toHaveBeenCalledTimes(1);

      expect(getByText('코드숨 과제하기')).toBeInTheDocument();
      expect(input.value).toBe('');
    });
  });

  describe('완료 버튼을 누르면', () => {
    test(' Task 삭제 함수가 호출된다.', () => {
      const tasks = [{ id: 0, title: '코드숨 과제하기' }];

      const { container, getByRole } = renderPage(tasks);

      const doneButton = getByRole('button', { name: /완료/ });

      expect(container).toHaveTextContent('코드숨 과제하기');
      expect(doneButton).toBeInTheDocument();

      fireEvent.click(doneButton);

      expect(handleClickDeleteTask).toHaveBeenCalledWith(0);
    });
  });
});
