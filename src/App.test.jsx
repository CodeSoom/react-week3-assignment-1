import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('첫 화면, 빈 리스트 문구', () => {
    const { container } = render((
      <App />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('task 입력, input 문구에 반영', () => {
    const { getByLabelText } = render((
      <App />
    ));

    const input = getByLabelText('할 일');

    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: '이것' } });

    expect(input).toHaveValue('이것');
  });

  it('입력한 task 추가, input 문구 초기화', () => {
    const { getByLabelText, getByText } = render((
      <App />
    ));

    const input = getByLabelText('할 일');
    fireEvent.change(input, { target: { value: '이것' } });
    fireEvent.click(getByText('추가'));

    expect(input).toHaveValue('');
  });

  it('입력한 task 추가, list에 task 추가', () => {
    const { container, getByLabelText, getByText } = render((
      <App />
    ));

    const input = getByLabelText('할 일');
    fireEvent.change(input, { target: { value: '이것' } });
    fireEvent.click(getByText('추가'));

    expect(container).not.toHaveTextContent('할 일이 없어요!');
    expect(container.querySelector('ol')).toBeInTheDocument();
    expect(container).toHaveTextContent('이것');
  });

  it('task 2개 추가, 추가한 task 삭제', () => {
    const { container, getByLabelText, getByText } = render((
      <App />
    ));

    const input = getByLabelText('할 일');
    fireEvent.change(input, { target: { value: '이것' } });
    fireEvent.click(getByText('추가'));
    fireEvent.change(input, { target: { value: '저것' } });
    fireEvent.click(getByText('추가'));

    expect(container).toHaveTextContent('이것');
    expect(container).toHaveTextContent('저것');

    fireEvent.click(getByText('이것').parentNode.querySelector('button'));
    expect(container).not.toHaveTextContent('이것');
    expect(container).toHaveTextContent('저것');
    expect(container).not.toHaveTextContent('할 일이 없어요!');

    fireEvent.click(getByText('저것').parentNode.querySelector('button'));
    expect(container).not.toHaveTextContent('저것');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
