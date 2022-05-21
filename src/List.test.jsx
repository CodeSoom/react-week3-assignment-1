import {
  fireEvent, render,
} from '@testing-library/react';

import List from './List';

describe('List', () => {
  test('리스트가 하나 이상 있다.', () => {
    const tasks = [{ id: 0, title: '코드숨 과제하기' }, { id: 1, title: '잠자기' }];

    const handleClickDelete = jest.fn();

    const { container, getAllByText } = render(
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />,
    );

    const completeButtons = getAllByText('완료');

    expect(completeButtons).toHaveLength(2);
    expect(container).toHaveTextContent('코드숨 과제하기');

    fireEvent.click(completeButtons[0]);

    expect(handleClickDelete).toBeCalledWith(0);
  });

  test('리스트가 없다.', async () => {
    const tasks = [];

    const handleClickDelete = jest.fn();

    const { container, queryByText } = render(
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />,
    );

    expect(container).toHaveTextContent('할 일이 없어요!');
    expect(queryByText('완료')).not.toBeInTheDocument();
  });
});
