import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  it('To-do와 할 일이 표시된다', () => {
    const tasks = [];
    const { container } = render(<Page tasks={tasks} />);

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });
});
