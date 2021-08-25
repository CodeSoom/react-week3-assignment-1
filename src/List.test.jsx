import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const renderList = ({ tasks }) => {
    const handleClick = jest.fn();

    return render((
      <List
        tasks={tasks}
        onClickDelete={handleClick}
      />
    ));
  };

  context('without task', () => {
    const tasks = [];
    const { container } = renderList({ tasks });

    it('renders 할 일이 없어요!', () => {
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    const tasks = [{ id: 0, title: '뭐라도 하기' }, { id: 1, title: '잠자기' }];
    const { container } = renderList({ tasks });

    it('renders tasks', () => {
      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('잠자기');
    });
  });
});
