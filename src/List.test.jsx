import { fireEvent, render } from '@testing-library/react';

import List from './List';

import { tasks } from '../fixtures/tasks';

describe('List Component', () => {
  const onClickDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (value) => render((
    <List
      tasks={value}
      onClickDelete={onClickDelete}
    />
  ));

  context('task 가 없을 경우', () => {
    it('empty 메시지 출력', () => {
      const { container } = renderComponent([]);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('task 가 있는 경우', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('task의 타이틀 및 완료 버튼이 render 된다.', () => {
      const { container, getAllByRole } = renderComponent(tasks);
      const buttons = getAllByRole('button', { name: '완료' });

      expect(buttons).toHaveLength(2);
      tasks.forEach(({ title }, index) => {
        expect(container).toHaveTextContent(title);
        expect(buttons[index]).toHaveTextContent('완료');
      });
    });

    it('완료 버튼을 클릭할 경우 해당 아이템의 id 값을 호출한다.', () => {
      const { getAllByRole } = renderComponent(tasks);
      const buttons = getAllByRole('button', { name: '완료' });

      fireEvent.click(buttons[1]);

      expect(buttons[1]).toHaveTextContent('완료');
      expect(onClickDelete).toHaveBeenCalledWith(tasks[1].id);
    });
  });
});
