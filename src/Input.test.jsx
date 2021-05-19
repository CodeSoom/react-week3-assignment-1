import { screen, render } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  it('renders label, input, button', () => {
    render(<Input />);

    screen.getByRole('textbox', { name: /할 일/ });
    screen.getByRole('button', { name: /추가/ });
  });

  it('changes input', () => {});

  it('calls onClick when click button', () => {});
});
