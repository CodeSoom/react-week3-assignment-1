import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  let renderResult;
  beforeEach(() => {
    renderResult = render(<App />);
    fireEvent.change(renderResult.getByPlaceholderText('할 일을 입력해 주세요'), {
      target: { value: '일기쓰기' },
    });
  });

  it('할일 추가 버튼 클릭시, 입력한 내용이 리스트에 추가되는지 확인한다.', () => {
    fireEvent.click(renderResult.getByText('추가'));
    expect(renderResult.container).toHaveTextContent('일기쓰기');
  });

  it('완료 버튼 클릭시, 할 일이 삭제되는지 확인한다.', () => {
    fireEvent.click(renderResult.getByText('추가'));
    fireEvent.click(renderResult.getByText('완료'));
    expect(renderResult.container).not.toHaveTextContent('일기쓰기');
  });

  it('더 이상 노출할 할 일이 없을 때, "할 일이 없어요!"문구가 노출되는지 확인한다.', () => {
    expect(renderResult.container).toHaveTextContent('할 일이 없어요!');
  });
});
