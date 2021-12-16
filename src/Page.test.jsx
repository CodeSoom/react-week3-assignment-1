import { render } from '@testing-library/react';
import Page from './Page';

// Input 컴포넌트 작동 확인 -할일

describe('Page', () => {
  context('Input 컴포넌트가 그려진다. ', () => {

  });
  it('Input 컴포넌트 작동 확인', () => {
    const { container, getByRole } = render(<Page tasks={[]} />);

    // Input 컴포넌트 작동 확인
    expect(container).toHaveTextContent('할 일');
    expect(container).toContainHTML('input');
    expect(container).toContainHTML('button');
    expect(getByRole('button')).toHaveTextContent('추가');

    // List 컴포넌트 작동 확인
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
  it('task가 비었을 때 List 컴포넌트 작동 확인 ', () => {
    const emptyTasks = [];
    const { container } = render(<Page tasks={emptyTasks} />);

    // List 컴포넌트 작동 확인
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('task가 있을 때', () => {
    // List 컴포넌트 작동 확인
    const tasks = [
      { id: 100, title: '숨 쉬기' },
      { id: 101, title: '물 마시기' },
    ];
    const { container, getAllByText } = render(<Page tasks={tasks} />);

    // Item 안에있는 title 확인
    expect(container).toHaveTextContent(tasks[0].title);
    expect(container).toHaveTextContent(tasks[1].title);

    // Itme 안에있는 완료버튼 존재 확인
    expect(getAllByText('완료')[0]).toContainHTML('button');
    expect(getAllByText('완료')[1]).toContainHTML('button');
  });
});
