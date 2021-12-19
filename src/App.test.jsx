import { render } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  it('할 일을 등록하면, 할 일 목록에 추가된다', () => {
    const { getByText, getByRole } = render(
      <App />,
    );

    const input = getByRole('textbox', { name: '할 일' });
    const addButton = getByRole('button', { name: '추가' });

    userEvent.type(input, '테스트를 할 거예요');
    userEvent.click(addButton);

    expect(input.value).toBe('');
    expect(getByText('테스트를 할 거예요')).toBeInTheDocument();
  });
});
