import { screen, render } from '@testing-library/react';

import Page from './Page';

describe('Page Test', () => {
  test('Page를 렌더한다.', () => {
    const tasks = [{
      id: 1,
      title: '뭐라도 하기',
    }];

    render(
      <Page tasks={tasks} />,
    );

    expect(screen.getByText('To-do')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('추가')).toBeInTheDocument();
    expect(screen.getByText('뭐라도 하기')).toBeInTheDocument();
    expect(screen.getByText('완료')).toBeInTheDocument();
  });
});
