import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List Test', () => {
  test('할 일이 존재할 때 화면에 할 일 목록을 렌더한다.', () => {
    const tasks = [{
      id: 1,
      title: '뭐라도 하기',
    }];

    const { container } = render(<List tasks={tasks} />);

    expect(container).toHaveTextContent('뭐라도 하기');
  });

  test('할 일이 존재하지 않을 때 "할 일이 없어요!"라는 텍스트를 렌더한다.', () => {
    const tasks = [];

    const { container } = render(<List tasks={tasks} />);

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  test('완료 버튼을 눌렀을 떄 handleClick 함수가 실행되어야 한다.', () => {
    const tasks = [{
      id: 1,
      title: '뭐라도 하기',
    }];

    const handleClick = jest.fn();

    const { getByText } = render(<List tasks={tasks} onClickDelete={handleClick} />);

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('완료'));
    expect(handleClick).toBeCalledWith(1);
  });
});
