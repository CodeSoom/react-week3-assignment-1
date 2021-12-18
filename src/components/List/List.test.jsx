import { render } from '@testing-library/react';
import List from './index';
import { EMPTY_MESSAGE } from '../../constants';
import { tasks } from './fixtures';

describe('List', () => {
  it('task가 비어있다면 관련 메세지를 보여줍니다.', () => {
    const sut = render(<List tasks={[]} />);
    const emptyElement = sut.queryByText(EMPTY_MESSAGE);

    expect(emptyElement).not.toBeNull();
  });

  it('task가 비어있지 않다면 빈 메세지를 보여주지 않습니다.', () => {
    const sut = render(<List tasks={tasks.slice(0, 1)} />);
    const emptyElement = sut.queryByText(EMPTY_MESSAGE);

    expect(emptyElement).toBeNull();
  });

  describe('비어있지 않은 tasks를 전달하면 tasks를 리스트로 보여줍니다.', () => {
    const sut = render(<List tasks={tasks} />);
    const list = sut.queryByRole('list');

    it.each(tasks)('%o', ({ title }) => {
      expect(list).toHaveTextContent(title);
    });
  });
});
