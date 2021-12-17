import { render } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  it('추가 버튼을 클릭하면 상태가 업데이트 되고 화면이 새롭게 렌더링되어 할 일이 그려진다', () => {
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
