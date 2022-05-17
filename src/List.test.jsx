import { fireEvent, getByText, render } from '@testing-library/react';

import List from './List';

test('List', () => {
  const task = [
    // { id: 1, title: '재정신 유지하기' },
    {
      id: 2,
      title: '꿀잠자기',
    },
  ];

  const handleClick = jest.fn();

  const { container, getByText } = render(
    <List tasks={task} onClickDelete={handleClick} />,
  );

  expect(container).toHaveTextContent('꿀잠자기');
  // expect(container).toHaveTextContent('재정신 유지하기');

  expect(handleClick).not.toBeCalled();

  // 여러 완료버튼 중 하나를 특정 짓거나 동시에 다 누르고 싶어요...
  // fireEvent.click(getAllByText('완료'));
  // fireEvent.click(findAllByText('완료'));
  fireEvent.click(getByText('완료'));

  expect('할 일이 없어요!');
  expect(task.length === 0);
});
