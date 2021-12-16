import { fireEvent, render } from '@testing-library/react';
import List from '../src/List';

describe('List', () => {
  test('할 일이 없는 경우에는 "할 일이 없어요" 가 노출된다.', () => {
    const tasks = [];
    const { container } = render(<List tasks={tasks} />);
    expect(container).not.toBe(null);
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  test('할 일이 5개라면 Item 요소가 5개 렌더링 된다.', () => {
    const tasks = [
      { id: 1, title: 'hello' },
      { id: 2, title: 'hello' },
      { id: 3, title: 'hello' },
    ];
    const { container, getAllByRole } = render(<List tasks={tasks} />);
    expect(container).not.toBe(null);
    expect(getAllByRole('listitem')).toHaveLength(3);
  });

  test('onClickDelete 클릭 시 할 일이 삭제된다.', () => {
    const tasks = [
      { id: 1, title: 'hello' },
    ];
    const handleClick = jest.fn();
    const { getByRole } = render(<List tasks={tasks} onClickDelete={handleClick} />);

    fireEvent.click(getByRole('button', { name: /완료/i }));
    expect(handleClick).toBeCalledWith(1);
  });
});
