import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  it('할일 목록 개수가 0개일 경우 "할 일이 없어요!" 문구를 보인다.', () => {
    const tasks = [];

    const handleClickDelete = jest.fn();
    const { container } = render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
