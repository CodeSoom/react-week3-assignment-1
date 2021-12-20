import { render } from '@testing-library/react';
import given from 'given2';
import Page from './Page';

describe('Page', () => {
  given('tasks', () => []);

  it('Input 컴포넌트가 그려진다.', () => {
    const { container, getByRole } = render(<Page tasks={given.tasks} />);

    expect(container).toHaveTextContent('할 일');
    expect(container).toContainHTML('input');
    expect(getByRole('button')).toHaveTextContent('추가');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  context('List에게 task가 없을 떄', () => {
    given('tasks', () => []);

    it('"할 일이 없어요"를 그린다.', () => {
      const { container } = render(<Page tasks={given.tasks} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('List에게 task가 있을 때', () => {
    given('tasks', () => [{
      id: 100,
      title: '할 일',
    }]);

    it('task를 그린다.', () => {
      const { container, getAllByText } = render(<Page tasks={given.tasks} />);

      expect(container).toHaveTextContent(given.tasks[0].title);
      expect(getAllByText('완료')[0]).toContainHTML('button');
    });
  });
});
