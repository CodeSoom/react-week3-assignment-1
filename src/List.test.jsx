import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();
  const renderComponent = ({ tasks }) => render(<List
    tasks={tasks}
    onClickDelete={handleClickDelete}
  />);

  context('with no tasks', () => {
    let tasks;
    beforeAll(() => {
      tasks = [];
    });
    it('renders empty message', () => {
      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    let tasks;
    beforeAll(() => {
      tasks = [{ id: 1, title: '일어나기' }];
    });
    it('renders task title', () => {
      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent('일어나기');
    });

    it('calls handleClickDelete', () => {
      const { getByText } = renderComponent({ tasks: [{ id: 1, title: '일어나기' }] });

      expect(handleClickDelete).not.toBeCalled();
      fireEvent.click(getByText('완료'));
      expect(handleClickDelete).toBeCalledWith(1);
    });
  });
});
