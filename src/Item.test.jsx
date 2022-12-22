import { render, screen, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item 컴포넌트', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  it('화면에 렌더 된다', () => {
    render(<Item task={task} />);

    expect(screen.getByRole('button', { name: '완료' }));
  });

  it('task의 title과 같은 값으로 렌더 된다.', () => {
    render(<Item task={task} />);

    expect(screen.getByText(/뭐라도 하기/));
  });

  it('버튼을 클릭하면 handleCompleteTask가 실행된다.', () => {
    const handlerCompleteTask = jest.fn();

    render(
      <Item
        task={task}
        onClickDelete={handlerCompleteTask}
      />,
    );

    const button = screen.getByRole('button', { name: '완료' });
    fireEvent.click(button);

    expect(handlerCompleteTask).toHaveBeenCalled();
  });
});
