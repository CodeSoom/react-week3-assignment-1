import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  const testRender = (tasks) => render((
    <List tasks={tasks} onClickDelete={handleClick} />
  ));

  context('List의 내용이 없을때 렌더링한다', () => {
    it('내용이 없으므로 할 일이 없어요!가 렌더링된다', () => {
      const tasks = [];

      const { container } = testRender(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('List의 내용이 있을때 렌더링한다', () => {
    it('내용이 있으므로 테스트 코드는 아주 어렵네요! 가 렌더링된다', () => {
      const tasks = [
        {
          id: 1,
          title: '테스트 코드는 아주 어렵네요!',
        },
      ];

      const { container, getByText } = testRender(tasks);

      expect(container).toHaveTextContent('테스트 코드는 아주 어렵네요!');

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('완료'));

      expect(handleClick).toBeCalledWith(1);
    });
  });
});
