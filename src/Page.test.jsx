import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 2,
      title: '코드숨 과제',
    },
  ];
  it('Page 컴포너트를 렌더한다', () => {
    const {
      getByText, getByLabelText, getAllByText,
    } = render(
      <Page tasks={tasks} />,
    );

    expect(getByText('To-do')).toBeInTheDocument();
    expect(getByLabelText('할 일')).toBeInTheDocument();

    tasks.forEach((task, index) => {
      expect(getAllByText('완료')[index]).toBeInTheDocument();
      expect(getByText(task.title)).toBeInTheDocument();
    });

    expect(getByText('추가')).toBeInTheDocument();
  });
});
