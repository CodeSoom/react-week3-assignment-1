import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const renderContainer = () => {
    const tasks = [
      { id: 100, title: 'test1' },
      { id: 101, title: 'test2' },
    ];

    return render(<Page tasks={tasks} />).container;
  };

  it('shows title "To-do"', () => {
    expect(renderContainer()).toHaveTextContent('To-do');
  });

  it('renders Input component', () => {
    expect(renderContainer()).toHaveTextContent(/할 일/);
    expect(renderContainer()).toHaveTextContent(/추가/);
  });

  it('renders List component', () => {
    expect(renderContainer()).toHaveTextContent('test1');
    expect(renderContainer()).toHaveTextContent('test2');
  });
});
