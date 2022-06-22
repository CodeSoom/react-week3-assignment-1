import { render, fireEvent } from '@testing-library/react';

import List from './List';

function renderList({ tasks = [], handleClickDelete = () => {} }) {
  return render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));
}

const tasks = [
  {
    id: 1,
    title: '뭐라도 하기',
  },
  {
    id: 2,
    title: '아무것도 하지 않기',
  },
];

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
        tasks,
      });

      expect(getAllByRole('listitem')).toHaveLength(tasks.length);
    });

    it('첫번째 Item 컴포넌트의 내용인 "뭐라도 하기"가 보인다.', () => {
      const { getAllByRole } = renderList({
        tasks,
      });

      const listItems = getAllByRole('listitem');

      expect(listItems[0]).toHaveTextContent(tasks[0].title);
    });
  });

  describe('완료 버튼 클릭', () => {
    const handleClickDelete = jest.fn();

    it('handleClickDelete이 호출된다.', () => {
      const { getAllByText } = renderList({
        tasks,
        handleClickDelete,
      });

      const completeButtons = getAllByText('완료');

      fireEvent.click(completeButtons[0]);

      expect(handleClickDelete).toBeCalled();
    });
  });
});
