import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

describe('Page 컴포넌트 관련 테스트', () => {
  it('input, list 태그 존재 여부 확인하기', () => {
    const tasks = [];

    const { container, queryByPlaceholderText, queryByText } = render((
      <Page tasks={tasks} />
    ));

    const input = queryByPlaceholderText('할 일을 입력해 주세요');
    const button = queryByText('추가');
    const list = queryByText('할 일이 없어요!');

    expect(container).toHaveTextContent('To-do');
    expect(input).toHaveAttribute('value', '');
    expect(button).not.toBeNull();
    expect(list).not.toBeNull();
  });

  it('추가버튼 클릭하면 입력값이 보여진다', () => {
    const tasks = [{
      title: '뭐라도 하기',
    }];

    const { container, getByText } = render((
      <Page tasks={tasks} />
    ));

    const button = getByText('추가');

    fireEvent.click(button);

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');
  });
});
