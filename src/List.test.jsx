import { render, fireEvent } from '@testing-library/react';

import List from './List';

import TASKS from './fixtures/tasks';

describe('<List />', () => {
  const handleClickDelete = jest.fn();

  beforeEach(() => {
    handleClickDelete.mockClear();
  });

  function renderList({ tasks = [] }) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));
  }

  context('할 일 목록이 없으면', () => {
    it('"할 일이 없어요!" 텍스트가 보인다.', () => {
      const { getByText } = renderList({
        tasks: [],
      });

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('할 일 목록이 있으면', () => {
    it('할 일 목록이 보인다.', () => {
      const { container } = renderList({
        tasks: TASKS,
      });

      TASKS.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });
  });

  describe('완료 버튼 클릭', () => {
    it('handleClickDelete이 호출된다.', () => {
      const { getAllByText } = renderList({
        tasks: TASKS,
      });

      const completeButtons = getAllByText('완료');

      expect(handleClickDelete).not.toBeCalled();

      fireEvent.click(completeButtons[0]);

      expect(handleClickDelete).toBeCalledTimes(1);
    });
  });
});
