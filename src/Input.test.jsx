import { render, fireEvent } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import Input from './Input';

test('test value on Input', () => {
  const value = { text: 'react 과제 제출 하기' };

  function onChange() {
    value.text = '컴퓨터 끄고 자기';
  }
  function onClick() {}
  const { container } = render(
    <Input value={value.text} onChange={onChange} onClick={onClick} />
  );
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  //   expect(container).toHaveTextContent('react 과제 제출 하기');
});

describe('Input component', () => {
  const renderInputComponent = (onChange = null, value = null) =>
    render(<Input onChange={onChange} value={value} />);

  it('label text 할 일', () => {
    const { getByText } = renderInputComponent();
    expect(getByText('할 일')).toContainHTML('label');
  });

  it('button text 추가', () => {
    const { getByText } = renderInputComponent();
    expect(getByText('추가')).toContainHTML('button');
  });

  it('onChange should be called', () => {
    const handlechange = jest.fn();
    const { container } = renderInputComponent(handlechange);
    expect(handlechange).not.toBeCalled();
  });
  
  it('value parameter should be changed', () => {});
  it('onChange should be called when value changes.', () => {});
});
