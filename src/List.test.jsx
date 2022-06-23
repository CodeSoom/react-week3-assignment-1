import { render, fireEvent } from '@testing-library/react';

import List from './List';

import TASKS from './fixtures/tasks';

function renderList({ tasks = [], handleClickDelete = () => {} }) {
  return render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));
}

describe('<List />', () => {
  context('할 일 목록이 없으면', () => {
    it('"할 일이 없어요!" 텍스트가 보인다.', () => {
      const { getByText } = renderList({
        tasks: [],
      });

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('할 일 목록이 있으면', () => {
    it('할 일 개수만큼 Item 컴포넌트가 보인다.', () => {
      const { getAllByRole } = renderList({
        tasks: TASKS,
      });

      expect(getAllByRole('listitem')).toHaveLength(TASKS.length);
    });

    TASKS.forEach(({ title }, index) => {
      it(`${index + 1}번째 Item 컴포넌트의 내용인 "${title}"가 보인다.`, () => {
        const { container } = renderList({
          tasks: TASKS,
        });

        expect(container).toHaveTextContent(title);
      });
    });
  });

  describe('완료 버튼 클릭', () => {
    const handleClickDelete = jest.fn();

    it('handleClickDelete이 호출된다.', () => {
      const { getAllByText } = renderList({
        tasks: TASKS,
        handleClickDelete,
      });

      const completeButtons = getAllByText('완료');

      fireEvent.click(completeButtons[0]);

      expect(handleClickDelete).toBeCalled();
    });
  });
});
