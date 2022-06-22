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
    it('"할 일이 없어요!"가 보입니다', () => {
      const { queryByText } = renderList({
        tasks: [],
      });

      expect(queryByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('할 일 목록이 있으면', () => {
    it('할 일 개수만큼 Item 컴포넌트가 보입니다', () => {
      const { queryAllByRole } = renderList({
        tasks,
      });

      expect(queryAllByRole('listitem')).toHaveLength(tasks.length);
    });

    it('첫번째 Item 컴포넌트의 내용이 "뭐라도 하기"입니다', () => {
      const { queryAllByRole } = renderList({
        tasks,
      });

      const listItems = queryAllByRole('listitem');

      expect(listItems[0]).toHaveTextContent(tasks[0].title);
    });
  });

  context('사용자가 완료 버튼을 클릭하면', () => {
    const handleClickDelete = jest.fn();

    it('onClickDelete 함수가 실행됩니다.', () => {
      const { getAllByRole } = renderList({
        tasks,
        handleClickDelete,
      });

      const completeButtons = getAllByRole('button');

      fireEvent.click(completeButtons[0]);

      expect(handleClickDelete).toBeCalled();
    });

    it('onClickDelete의 인자로 클릭한 Item의 id가 전달됩니다.', () => {
      const { getAllByRole } = renderList({
        tasks,
        handleClickDelete,
      });

      const completeButtons = getAllByRole('button');

      fireEvent.click(completeButtons[0]);

      expect(handleClickDelete).toBeCalledWith(1);
    });
  });
});
