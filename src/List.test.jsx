import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const onClickDelete = jest.fn();

  const renderList = ({ tasks }) => render((
    <List
      tasks={tasks}
      onClickDelete={onClickDelete}
    />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('without task', () => {
    const tasks = [];

    it('renders 할 일이 없어요!', () => {
      const { container } = renderList({ tasks });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    const tasks = [{ id: 0, title: '뭐라도 하기' }, { id: 1, title: '잠자기' }];

    it('renders tasks', () => {
      const { container } = renderList({ tasks });

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('잠자기');
      expect(container).toHaveTextContent('완료');
    });

    it('listens button click event', () => {
      const { getAllByText } = renderList({ tasks });

      expect(onClickDelete).not.toBeCalled();

      const completeButtons = getAllByText('완료');

      fireEvent.click(completeButtons[0]);

      expect(onClickDelete).toHaveBeenCalledTimes(1);
    });
  });
});
