import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const tasks = [{ id: 1, title: '1' }];

  function renderPage() {
    return render(<Page tasks={tasks} />);
  }

  it('1. Page가 정상적으로 렌더되어야 한다.', () => {
    const { getByRole, getByText } = renderPage();

    expect(getByText('To-do')).toBeInTheDocument();
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByText('추가')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('완료')).toBeInTheDocument();
  });
});
