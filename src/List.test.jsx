import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const onClickDelete = jest.fn();

  const tasks = [{
    id: 1,
    title: '뭐라도 하기',
  },
  ];

  const emptyTask = [];

  const rendererList = (task) => render(
    <List
      tasks={task}
      onClickDelete={onClickDelete}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('List가 렌더링될 때', () => {
    describe('task의 할 일 목록에', () => {
      context('할 일이 있을 시', () => {
        it('해당 tasks의 할 일 목록만큼 리스트가 보입니다.', () => {
          const { getAllByRole } = rendererList(tasks);

          const todos = getAllByRole('listitem');

          expect(todos.length).toBe(tasks.length);
        });

        context('할 일이 없을 시', () => {
          it('"할 일이 없어요!"가 출력됩니다.', () => {
            const { container } = rendererList(emptyTask);

            expect(container).toHaveTextContent('할 일이 없어요!');
          });
        });
      });
    });

    describe('유저가 "완료"', () => {
      context('버튼을 클릭하면', () => {
        it('onClickDelete가 호출됩니다.', () => {
          const { getByText } = rendererList(tasks);

          fireEvent.click(getByText('완료'));

          expect(onClickDelete).toBeCalledTimes(1);
        });
      });

      context('버튼을 클릭하지 않는다면', () => {
        it('onClickDelete가 호출되지 않습니다.', () => {
          rendererList(tasks);

          expect(onClickDelete).not.toBeCalled();
        });
      });
    });
  });
});
