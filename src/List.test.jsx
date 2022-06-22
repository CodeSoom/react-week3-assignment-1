import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('<List />', () => {
  context('할 일 목록이 없을 경우 "할 일이 없어요!"가 화면에 출력됩니다.', () => {
    it('"할 일이 없어요!"가 화면에 출력되는지 확인합니다.', () => {
      const { queryByText } = render((
        <List tasks={[]} />
      ));

      expect(queryByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });
});

test('List is Rendered', () => {
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

  const handleClickDelete = jest.fn();

  const { getAllByRole } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));

  const items = getAllByRole('listitem');

  expect(items).toHaveLength(tasks.length);

  items.forEach((item, index) => {
    const task = tasks[index];

    expect(item).toHaveTextContent(task.title);
  });

  expect(handleClickDelete).not.toBeCalled();

  const completeButtons = getAllByRole('button');

  expect(completeButtons).toHaveLength(2);

  completeButtons.forEach((button) => {
    expect(button).toHaveTextContent('완료');
  });

  fireEvent.click(completeButtons[0]);

  expect(handleClickDelete).toBeCalledWith(1);
});
