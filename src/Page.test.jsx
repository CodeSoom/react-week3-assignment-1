import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

describe('Page 컴포넌트 관련 테스트', () => {
  it('input, list 태그 존재 여부 확인하기', () => {
    const tasks = [];

    const { container } = render((
      <Page
        tasks={tasks}
      />
    ));

    expect(container.hasChildNodes('input')).toBe(true);
    expect(container.hasChildNodes('list')).toBe(true);
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
