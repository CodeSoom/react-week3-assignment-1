import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const title = '새로운';

  const handleChange = jest.fn();
  const handleAddClick = jest.fn();

  const tasks = [
    { id: 1, title: '이것' },
    { id: 2, title: '저것' },
    { id: 3, title: '아무거나' },
  ];

  const handleDeleteClick = jest.fn();

  const { container, getByText } = render((
    <Page
      taskTitle={title}
      onChangeTitle={handleChange}
      onClickAddTask={handleAddClick}
      tasks={tasks}
      onClickDeleteTask={handleDeleteClick}
    />
  ));

  expect(container).toHaveTextContent('To-do');

  expect(getByText('할 일')).toBeInTheDocument();

  expect(container.querySelector('ol')).toBeInTheDocument();
});
