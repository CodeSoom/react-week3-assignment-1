import { fireEvent, screen, render } from '@testing-library/react';

import App from './App';

describe('<App />', () => {
  function setup() {
    render(<App />);

    const input = screen.getByLabelText('할 일');
    const button = screen.getByRole('button', { name: '추가' });

    return {
      input,
      button,
    };
  }

  it('changes taskTitle', () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: '뭐라도 하기' } });

    expect(input).toHaveAttribute('value', '뭐라도 하기');
  });

  it('creates new task', () => {
    const { input, button } = setup();

    fireEvent.change(input, { target: { value: '뭐라도 하기' } });
    fireEvent.click(button);

    screen.getByText('뭐라도 하기');
  });

  it('deletes a task', () => {
    const { input, button } = setup();

    fireEvent.change(input, { target: { value: '뭐라도 하기' } });
    fireEvent.click(button);
    fireEvent.click(screen.getByRole('button', { name: '완료' }));

    screen.getByText('할 일이 없어요!');
  });
});
