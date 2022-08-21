import { render, fireEvent } from '@testing-library/react';

import List from './List';
import { tasks } from './__fixtures__/tasks';

describe('<List/>', () => {
  const handleClick = jest.fn();

  const appComponent = (tasks) => render(
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />,
  );

  context('with tasks', () => {
    it('renders tasks', () => {
      const { container } = appComponent(tasks);

      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });

      expect(container).toHaveTextContent('완료');
    });

    it('clicks "완료" buttons to delete tasks', () => {
      const { getAllByText } = appComponent(tasks);

      expect(handleClick).not.toBeCalled();

      const buttons = getAllByText('완료');
      buttons.forEach((button) => fireEvent.click(button));

      expect(handleClick).toBeCalledTimes(2);
    });
  });

  context('without tasks', () => {
    it('renders "할 일이 없어요!"', () => {
      const { container } = appComponent([]);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
