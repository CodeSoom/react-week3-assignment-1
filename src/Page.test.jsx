import { render } from '@testing-library/react';

import Page from './Page';

// Input 컴포넌트 작동 확인 -할일

describe('Page', () => {
  let tasks;

  context('언제든지', () => {
    it('Input 컴포넌트가 그려진다.', () => {
      const { container, getByRole } = render(<Page tasks={[]} />);
      expect(container).toHaveTextContent('할 일');
      expect(container).toContainHTML('input');
      expect(getByRole('button')).toHaveTextContent('추가');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
  context('List에게 task가 없다.', () => {
    beforeEach(() => {
      tasks = [];
    });
    it('"할 일이 없어요"를 그린다.', () => {
      const { container } = render(<Page tasks={tasks} />);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('List에게 task가 2개 있다.', () => {
    beforeEach(() => {
      tasks = [
        { id: 100, title: '숨 쉬기' },
        { id: 101, title: '물 마시기' },
      ];
    });

    it('2개의 task의 각 title과 버튼을 그린다..', () => {
      const { container, getAllByText } = render(<Page tasks={tasks} />);

      expect(container).toHaveTextContent(tasks[0].title);
      expect(container).toHaveTextContent(tasks[1].title);

      expect(getAllByText('완료')[0]).toContainHTML('button');
      expect(getAllByText('완료')[1]).toContainHTML('button');
    });
  });
});
