import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List Component', () => {
  const tasks = [
    {
      id: 1,
      title: '아무 것도 하지 않기',
    },
    {
      id: 2,
      title: '코드숨 과제하기',
    },
  ];
  const onClickDelete = jest.fn();

  context('task 가 없을 경우', () => {
    it("task가 없을 경우, '할 일이 없어요!' 출력", () => {
      const { container } = render((
        <List tasks={[]} onClickDelete={onClickDelete} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('task 가 있는 경우', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('task의 타이틀 및 완료 버튼이 render 된다.', () => {
      const { container, getAllByRole } = render((
        <List tasks={tasks} onClickDelete={onClickDelete} />
      ));

      expect(container).toHaveTextContent('아무 것도 하지 않기');
      expect(container).toHaveTextContent('코드숨 과제하기');

      const buttons = getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('완료');
    });

    it('완료 버튼을 클릭할 경우 해당 아이템의 id 값을 호출한다.', () => {
      const { getAllByRole } = render((
        <List tasks={tasks} onClickDelete={onClickDelete} />
      ));

      const buttons = getAllByRole('button');
      expect(buttons[1]).toHaveTextContent('완료');
      expect(onClickDelete).not.toHaveBeenCalled();
      fireEvent.click(buttons[1]);
      expect(onClickDelete).toHaveBeenCalledWith(2);
    });
  });
});
