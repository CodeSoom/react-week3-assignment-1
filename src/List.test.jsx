import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('List with tasks', () => {
  const tasks = [
    { id: 1, title: '이것' },
    { id: 2, title: '저것' },
    { id: 3, title: '아무거나' },
  ];

  const handleClick = jest.fn();

  const { container, getByText } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('이것');
  expect(container).toHaveTextContent('저것');
  expect(container).toHaveTextContent('아무거나');
  expect(container).toHaveTextContent('완료');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('이것').parentNode.querySelector('button'));

  expect(handleClick).toBeCalledTimes(1);

  fireEvent.click(getByText('저것').parentNode.querySelector('button'));

  expect(handleClick).toBeCalledTimes(2);

  fireEvent.click(getByText('아무거나').parentNode.querySelector('button'));

  expect(handleClick).toBeCalledTimes(3);
});
