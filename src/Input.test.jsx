import { render, screen } from '@testing-library/react';

import Input from './Input';

describe('Input Component', () => {
  const { container } = render((
    <Input />
  ));

  it('render', () => {
    screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('when typing, input changed value', () => {

  });

  it('after typing, click button to init value', () => {

  });
});
