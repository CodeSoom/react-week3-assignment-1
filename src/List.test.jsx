import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('<List />', () => {
  it('task가 0일 경우 "할 일이 없어요!" 문구를 보인다.', () => {
    const tasks = [];

    const handleClickDelete = jest.fn();
    const { container } = render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('완료 버튼을 클릭할 경우 리스트에서 보여지지 않는다.', () => {
    const tasks = [{
      id: 1,
      title: 'task1',
    }];

    const handleClickDelete = jest.fn();
    const { getByText } = render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));

    const todoText = getByText('task1');
    const doneButton = todoText.nextSibling;

    fireEvent.click(doneButton);

    expect(todoText).not.toBeInTheDocument();
  });
});
