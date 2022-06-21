import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('tasks의 컨텐츠에 따라 다른 결과가 나오는 지 확인합니다.', () => {
    it('tasks에 컨텐츠가 있을 시 해당 tasks에 있는 title이 출력됩니다.', () => {
      const tasks = [{
        id: 1,
        title: '뭐라도 하기',
      },
      {
        id: 2,
        title: '숨쉬기',
      },
      ];

      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('숨쉬기');
    });

    it('tasks에 컨텐츠가 없을 시 "할 일이 없어요!"가 출력됩니다.', () => {
      const tasks = [];

      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
