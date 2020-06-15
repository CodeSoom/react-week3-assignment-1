import React from 'react';

import { render } from '@testing-library/react';
import List from './List';

describe('<List />', () => {
  const dom = (props = {}) => {
    const { tasks, onClickDelete } = props;
    return render(<List tasks={tasks} onClickDelete={onClickDelete} />);
  };

  context('테스크가 없을 경우, ', () => {
    it('"할 일이 없어요!" 텍스트가 있다.', () => {
      const tasks = [];
      const { container } = dom({ tasks });
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('테스크가 있을 경우, ', () => {
    it('각 테스트의 타이틀이 보인다.', () => {
      const tasks = [
        {
          id: 1,
          title: 'first task',
        },
        {
          id: 2,
          title: 'seccond task',
        },
      ];
      const { getByText } = dom({ tasks });
      expect(getByText('first task')).toBeInTheDocument();
      expect(getByText('seccond task')).toBeInTheDocument();
    });
  });
});
