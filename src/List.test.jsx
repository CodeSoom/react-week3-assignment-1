import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 2,
      title: '맛있는 음식 먹기',
    },
  ];

  context('with tasks', () => {
    it('renders task title', () => {
      const { container } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClickDelete}
        />
      ));

      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
    });

    context('when the delete button is clicked', () => {
      it('calls handleClickDelete', () => {
        const { getAllByText } = render((
          <List
            tasks={tasks}
            onClickDelete={handleClickDelete}
          />
        ));

        fireEvent.click(getAllByText('완료')[0]);

        expect(handleClickDelete).toBeCalledWith(1);
      });
    });
  });

  context('without task', () => {
    it('renders message `할 일이 없어요!`', () => {
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
