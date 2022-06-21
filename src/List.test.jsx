import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
  ];
  const handleClickDelete = jest.fn();

  context('할 일이 없다면', () => {
    const { container } = render(
      <List tasks={[]} onClickDelete={handleClickDelete} />,
    );

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  context('할 일이 있다면', () => {
    it('할 일이 보인다', () => {
      const { container } = render(
        <List tasks={tasks} onClickDelete={handleClickDelete} />,
      );

      expect(container).toHaveTextContent('뭐라도 하기');
    });

    it('완료 버튼을 한 번 누른다.', () => {
      const { getByText } = render(
        <List tasks={tasks} onClickDelete={handleClickDelete} />,
      );
      expect(handleClickDelete).not.toBeCalled();

      const completeButtons = getByText('완료');

      fireEvent.click(completeButtons);

      expect(handleClickDelete).toHaveBeenCalledTimes(1);
    });
  });
});
