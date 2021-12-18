import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  let tasks;
  const handleClickDelete = jest.fn();

  const renderComponent = ({ tasks: tasksProp }) => render(<List
    tasks={tasksProp}
    onClickDelete={handleClickDelete}
  />);

  beforeAll(() => {
    handleClickDelete.mockClear();
  });

  context('with no tasks', () => {
    beforeAll(() => {
      tasks = [];
    });
    it('renders empty message', () => {
      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    beforeAll(() => {
      tasks = [{ id: 1, title: '일어나기' }];
    });

    it('renders task title', () => {
      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent('일어나기');
    });

    it('calls handleClickDelete when click complete button', () => {
      const { getByText } = renderComponent({ tasks: [{ id: 1, title: '일어나기' }] });

      fireEvent.click(getByText('완료'));
      expect(handleClickDelete).toBeCalledWith(1);
    });
  });
});
