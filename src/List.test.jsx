import { fireEvent, getByText, render } from '@testing-library/react';

import List from './List';

/**
 * Given // When // Then
 * (describe context it)
 *
 * List 컴포넌트 // tasks 빈 배열일 때 // "할 일이 없어요!" 가 출력됨
 * List 컴포넌트 // tasks 데이터가 있을 때 // "할 일이 없어요!" 가 출력되지 않음
 * List 컴포넌트 // tasks 데이터가 있을 때 // <Item /> 요소가 반복문으로 출력됨
 */

describe('List 컴포넌트', () => {
  const listComponent = (task) => render(<List tasks={task} />);

  context('할 일이 없으면', () => {
    const task = [];

    const { container } = listComponent(task);

    it('"할 일이 없어요!" 가 출력 된다.', () => {
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할 일이 있으면', () => {
    const task = [
      {
        id: 1,
        title: '맞춤법 지키기',
      },
      {
        id: 2,
        title: '꿀잠자기',
      },
    ];

    const { container } = listComponent(task);

    it('"할 일이 없어요!"가 출력되지 않는다.', () => {
      expect(container).not.toHaveTextContent('할 일이 없어요!');
    });
    it('할 일 목록이 출력된다.', () => {
      task.forEach((todo) => {
        // 아래 줄 에러 메시지가 이해가 안갑니다...title이 string 값인걸 명시적으로 알려줘야하나요?
        expect(container).toHaveTextContent(todo.title);
      });
    });
  });
});
