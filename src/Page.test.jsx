import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const renderPage = () => {
    const tasks = [
      { id: 100, title: 'test1' },
      { id: 101, title: 'test2' },
    ];

    return render(<Page tasks={tasks} />);
  };

  it('shows title "To-do"', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('To-do');
  });

  it('renders Input component', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent(/할 일/);
    expect(container).toHaveTextContent(/추가/);
  });

  it('renders List component', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('test1');
    expect(container).toHaveTextContent('test2');
  });
});
