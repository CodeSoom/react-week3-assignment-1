import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const onClickDelete = jest.fn();

  const listComponentRender = (tasks = []) =>
    render(<List tasks={tasks} onClickDelete={onClickDelete} />);

  context('with no tasks', () => {
    it('renders with 할 일이 없어요!', () => {
      const { container } = listComponentRender();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('renders task-lists', () => {
      const tasks = ['todo1', 'todo2'];

      const { getByRole } = listComponentRender(tasks);

      expect(getByRole('list')).toBeInTheDocument();
    });

    it('renders lists as many as tasks', () => {
      const tasks = ['todo1', 'todo2'];

      const { getByRole } = listComponentRender(tasks);

      expect(getByRole('list')).toContainHTML(
        '<ol><li><button type="button">완료</button></li><li><button type="button">완료</button></li></ol>'
      );
    });
  });

  context('click delete button', () => {
    it('onClickDelete to be called', () => {
      const tasks = ['todo1'];

      const { getByRole } = listComponentRender(tasks);

      fireEvent.click(getByRole('button'));

      expect(onClickDelete).toBeCalled();
    });

    context('after click the delete button', () => {
      const tasks = ['todo1'];

      const { getByText } = listComponentRender(tasks);

      fireEvent.click(getByText('완료'));

      it('renders with 할 일이 없어요!', () => {
        const { container } = listComponentRender();

        expect(container).toHaveTextContent('할 일이 없어요!');
      });
    });
  });
});
