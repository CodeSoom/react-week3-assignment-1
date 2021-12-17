import { render } from '@testing-library/react';
import List from './List';

describe('List', () => {
  // 테스트가 실행되기 전에 실행
  beforeEach(() => {
    // mocking 함수들을 초기화
    jest.clearAllMocks();
  });

  describe('when task is empty', () => {
    it('show specific text', () => {
      // Given
      const tasks = [];
      const { container } = render(<List tasks={tasks} />);

      // Then
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  describe('when task is given', () => {
    it('show title of task', () => {
      // Given
      const tasks = [{ id: 100, title: '운동하기' }];
      const { container, getByText } = render(<List tasks={tasks} />);

      // Then
      expect(container).toHaveTextContent('운동하기');
      expect(getByText('완료')).toBeInTheDocument();
    });
  });
});
