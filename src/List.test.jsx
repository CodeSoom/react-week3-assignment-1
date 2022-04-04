import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('with tasks', () => {
    it('renders without crashing', () => {
      const tasks = [{
        id: 1,
        title: '뭐라도 하기',
      }, {
        id: 2,
        title: '맛있는 음식 먹기',
      }];

      const handleClickDelete = jest.fn();

      const { container, getAllByText } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClickDelete}
        />
      ));

      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
      expect(container).toHaveTextContent('완료');

      fireEvent.click(getAllByText('완료')[0]);

      expect(handleClickDelete).toBeCalledWith(1);
    });
  });

  context('with no task', () => {
    it('renders without crashing', () => {
      const handleClickDelete = jest.fn();

      const { container } = render((
        <List
          tasks={[]}
          onClickDelete={handleClickDelete}
        />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
