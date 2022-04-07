import {
  fireEvent, render, getByText,
} from '@testing-library/react';

import List from './List';

const onClickDelete = jest.fn();

const tasks = [
  { id: 100, title: '밥먹기' },
  { id: 101, title: '테스트 코드 짜기' },
  { id: 102, title: 'PR 날리기' },
];

const renderList = ({ tasks: tasksProps }) => render((
  <List
    tasks={tasksProps || tasks}
    onClickDelete={onClickDelete}
  />
));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('List', () => {
  context('without task', () => {
    it('renders not have the task', () => {
      const { container } = renderList({ tasks: [] });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('renders tasks', () => {
      const { container, getAllByText } = renderList({});

      expect(container).toHaveTextContent('밥먹기');
      expect(container).toHaveTextContent('테스트 코드 짜기');
      expect(container).toHaveTextContent('PR 날리기');

      expect(getAllByText('완료')).toHaveLength(3);
    });

    it('should trigger onClickDelete function with the task id args', () => {
      const { container } = renderList({});

      const clickTaskButton = (taskTitle) => {
        fireEvent.click(
          getByText(getByText(container, taskTitle), '완료'),
        );
      };

      expect(onClickDelete).not.toBeCalled();

      clickTaskButton('밥먹기');

      expect(onClickDelete).toBeCalledTimes(1);
      expect(onClickDelete).toBeCalledWith(100);

      clickTaskButton('테스트 코드 짜기');

      expect(onClickDelete).toBeCalledTimes(2);
      expect(onClickDelete).toBeCalledWith(101);

      clickTaskButton('PR 날리기');

      expect(onClickDelete).toBeCalledTimes(3);
      expect(onClickDelete).toBeCalledWith(102);
    });
  });
});
