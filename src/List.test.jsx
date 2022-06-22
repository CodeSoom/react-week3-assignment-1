import { render, fireEvent } from '@testing-library/react';

import List from './List';

const NO_HAVE_TASKS = [];
const HAVE_TASKS = [
  { id: 0, title: '첫 번째 할일' },
  { id: 1, title: '두 번째 할일' },
];

describe('List에 tasks가 없는 경우.', () => {
  // events
  let handleClickDelete;

  // element
  let renderElement;

  const initializeTestProps = () => {
    handleClickDelete = jest.fn();

    renderElement = render(
      <List
        tasks={NO_HAVE_TASKS}
        onClickDelete={handleClickDelete}
      />,
    );
  };
  beforeEach(() => {
    initializeTestProps();
  });

  const clearMock = () => {
    handleClickDelete = jest.fn();
  };
  afterEach(() => {
    clearMock();
  });

  test('List는 (할 일이 없어요!) 문구를 렌더링 한다.', () => {
    const { container } = renderElement;
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});

describe('List에 tasks가 있는 경우.', () => {
  // events
  let handleClickDelete;

  // element
  let renderElement;

  const initializeTestProps = () => {
    handleClickDelete = jest.fn();

    renderElement = render(
      <List
        tasks={HAVE_TASKS}
        onClickDelete={handleClickDelete}
      />,
    );
  };
  beforeEach(() => {
    initializeTestProps();
  });

  const clearMock = () => {
    handleClickDelete = jest.fn();
  };
  afterEach(() => {
    clearMock();
  });

  test('List는 (첫 번째 할일), (두 번째 할일)을 렌더링 한다.', () => {
    const { container } = renderElement;
    expect(container).toHaveTextContent('첫 번째 할일');
    expect(container).toHaveTextContent('두 번째 할일');
  });

  test('List의 완료 버튼을 누르면, 해당하는 task의 handleClickDelete가 실행된다.', () => {
    const { getAllByText } = renderElement;
    expect(handleClickDelete).not.toBeCalled();
    fireEvent.click(getAllByText('완료')[0]);
    expect(handleClickDelete).toBeCalled();

    fireEvent.click(getAllByText('완료')[1]);
    expect(handleClickDelete).toBeCalledTimes(2);
  });
});
