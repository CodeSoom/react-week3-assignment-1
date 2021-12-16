import { fireEvent, render } from '@testing-library/react';
import App from '../src/App';

test('App', () => {
  const { container, getByRole } = render(<App />);

  expect(container).not.toBe(null);
  expect(container).toHaveTextContent('할 일이 없어요!');

  const input = getByRole('textbox', { name: /할 일/i });

  fireEvent.change(input, { target: { value: 'Study' } });
  expect(input).toHaveValue('Study');

  fireEvent.click(getByRole('button', { name: /추가/i }));
  expect(input).toHaveValue('');
  expect(container).toHaveTextContent('Study');

  fireEvent.click(getByRole('button', { name: /완료/i }));
  expect(container).toHaveTextContent('할 일이 없어요!');
});
