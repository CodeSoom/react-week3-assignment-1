import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  test('아무런 task가 등록되어 있지 않다면, \'할 일이 없어요!\'라는 메세지를 볼 수 있다.', () => {
    const tasks = [];

    const { container } = render((
      <List tasks={tasks} />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  test('등록되어 있는 task가 있다면, 리스트와 완료 버튼을 볼 수 있다.', () => {
    const tasks = [{
      id: 1,
      title: 'something',
    },
    {
      id: 2,
      title: 'nothing',
    }];

    const handleClickDelete = jest.fn();

    const { container } = render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));

    expect(container).toHaveTextContent('something');
    expect(container).toHaveTextContent('nothing');
    expect(container).toHaveTextContent('완료');
  });

  test('완료 버튼을 누르면, 해당 task의 id값을 넘겨받은 Click 이벤트가 실행된다.', () => {
    const tasks = [{
      id: 1,
      title: 'something',
    },
    {
      id: 2,
      title: 'nothing',
    }];

    const handleClickDelete = jest.fn();

    const { getAllByText } = render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));

    expect(handleClickDelete).not.toBeCalled();

    fireEvent.click(getAllByText('완료')[1]);

    expect(handleClickDelete).toBeCalledWith(tasks[1].id);
  });
});
