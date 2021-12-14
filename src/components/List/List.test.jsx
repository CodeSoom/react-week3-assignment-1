import { render } from '@testing-library/react';
import List from './index';
import { EMPTY_MESSAGE } from '../../constants';

describe('List', () => {
  it(`tasks의 length가 0이면 "${EMPTY_MESSAGE}"를 보여줍니다.`, () => {
    const sut = render(<List tasks={[]} />);
    const $emptyElement = sut.queryByText(EMPTY_MESSAGE);

    expect($emptyElement).not.toBeNull();
  });

  it(`tasks의 length가 0이 아니면 "${EMPTY_MESSAGE}"를 보여주지 않습니다.`, () => {
    const sut = render(<List tasks={[{ id: 1, title: 'foo' }]} />);
    const $emptyElement = sut.queryByText(EMPTY_MESSAGE);

    expect($emptyElement).toBeNull();
  });

  it('비어있지 않은 tasks를 전달하면 tasks를 리스트로 보여줍니다.', () => {
    const tasks = [
      { id: 1, title: 'foo' },
      { id: 2, title: 'bar' },
    ];
    const sut = render(<List tasks={tasks} />);
    const $list = sut.queryByRole('list');

    expect($list).not.toBeNull();
    expect($list.children).toHaveLength(tasks.length);
  });
});
