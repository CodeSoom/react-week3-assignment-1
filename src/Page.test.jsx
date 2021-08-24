import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const tasks = [
    { id: 100, title: 'test1' },
    { id: 101, title: 'test2' },
  ];
  let container;

  beforeEach(() => {
    container = render(<Page tasks={tasks} />).container;
  });

  it('shows title "To-do"', () => {
    expect(container).toHaveTextContent('To-do');
  });

  it('renders Input component', () => {
    expect(container).toHaveTextContent(/할 일/);
    expect(container).toHaveTextContent(/추가/);
  });

  it('renders List component', () => {
    expect(container).toHaveTextContent('test1');
    expect(container).toHaveTextContent('test2');
  });
});
