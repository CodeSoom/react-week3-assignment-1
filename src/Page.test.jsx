import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const tasks = [{ id: 1, title: '1' }];

  const renderPage = () => render(<Page tasks={tasks} />);

  it('Page 컴포넌트를 렌더한다.', () => {
    const { getByRole, getByLabelText, getByText } = renderPage();

    expect(getByText('To-do')).toBeInTheDocument();
    expect(getByLabelText('할 일')).toBeInTheDocument();
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByText('추가')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('완료')).toBeInTheDocument();
  });
});
