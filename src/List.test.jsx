import {
  fireEvent, render,
} from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  function listRender(tasks) {
    return render(
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />,
    );
  }
  context('할 일이 하나라도 있을 때', () => {
    test('할 일 목록을 보여준다.', () => {
      const tasks = [{ id: 0, title: '코드숨 과제하기' }, { id: 1, title: '잠자기' }];

      const { container, getAllByText } = listRender(tasks);

      const completeButtons = getAllByText('완료');

      expect(completeButtons).toHaveLength(2);
      expect(container).toHaveTextContent('코드숨 과제하기');

      fireEvent.click(completeButtons[0]);

      expect(handleClickDelete).toBeCalledWith(0);
    });
  });

  context('할 일이 비어있을 때', () => {
    test('할 일이 없어요! 메세지를 보여준다.', () => {
      const tasks = [];

      const { container, queryByText } = listRender(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(queryByText('완료')).not.toBeInTheDocument();
    });
  });
});
