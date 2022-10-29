import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  function renderList(tasks) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));
  }

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '넷플릭스 보기' },
      { id: 2, title: '카페 가기' },
    ];

    it('renders tasks', () => {
      const { getByText } = renderList(tasks);

      expect(getByText(/넷플릭스 보기/)).not.toBeNull();
      expect(getByText(/카페 가기/)).not.toBeNull();
    });

    it('renders "완료" button to delete a task', () => {
      const { getAllByText } = renderList(tasks);

      /* fireEvent.click(screen.getByText('완료'));
      `*AllBy*` variant of the query..오류=> buttons이 여러개이기때문에 오류가 생김
      */

      const buttons = getAllByText('완료');

      fireEvent.click(buttons[0]);

      expect(handleClickDelete).toBeCalledWith(1);// buttons[0]=>1번째꺼 고르게 했으니까 1
    });
  });

  context('without tasks', () => {
    it('renders no task message', () => {
      const tasks = [];

      const { getByText } = renderList(tasks);

      expect(getByText(/할 일이 없어요!/)).not.toBeNull();
    });
  });
});
