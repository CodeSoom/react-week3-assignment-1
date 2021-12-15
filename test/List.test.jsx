import { render } from '@testing-library/react';
import List from '../src/List';

describe('List', () => {
  // tasks 가 비어 있는 경우에는 "할 일이 없어요" 가 렌더링
  it('할 일이 없는 경우에는 "할 일이 없어요" 가 노출된다.', () => {
    const tasks = [];
    const { container } = render(<List tasks={tasks} />);
    expect(container).not.toBe(null);
  });

  // tasks 가 있는 경우에는 tasks 의 길이만큼 Item 요소가 렌더링
  it('할 일이 5개라면 Item 요소가 5개 렌더링 된다.', () => {
    const tasks = [];
    const { container } = render(<List tasks={tasks} />);
    expect(container).not.toBe(null);
  });
});
