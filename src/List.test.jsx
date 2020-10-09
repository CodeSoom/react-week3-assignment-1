import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('<List />', () => {
  it('할 일이 없어요!', () => {
    const tasks = [];
    const { container } = render((
      <List tasks={tasks} />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('아이템 리스트', () => {
    const tasks = [
      {
        id: 1,
        title: '값이 잘 들어간다',
      },
      {
        id: 2,
        title: '값이 짤 들어간다',
      },
    ];

    const { container } = render((<List tasks={tasks} />));

    expect(container).toHaveTextContent('값이 잘 들어간다');
    expect(container).toHaveTextContent('값이 짤 들어간다');
  });
});
