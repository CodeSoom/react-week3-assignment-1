import { render } from '@testing-library/react';

import Page from './Page';

describe('Page component', () => {
  const tasks = [
    {
      id: 100,
      title: 'something',
    },
  ];

  it('returns title', () => {
    const { container } = render(<Page tasks={tasks} />);

    expect(container).toHaveTextContent('To-do');
  });

  it('returns Input', () => {
    const { container } = render(<Page tasks={tasks} />);

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('returns List', () => {
    const { container } = render(<Page tasks={tasks} />);

    expect(container).toHaveTextContent('something');
  });
});
