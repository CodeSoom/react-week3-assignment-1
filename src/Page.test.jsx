import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const renderPage = (tasks) => render((
    <Page tasks={tasks} />
  ));

  context('화면이 렌더링 될 때', () => {
    const tasks = [
      { id: 1, title: '아무거나 추가하기' },
    ];

    it('입력폼을 화면에 표시한디', () => {
      const { getByPlaceholderText, getByText } = renderPage(tasks);

      getByPlaceholderText('할 일을 입력해 주세요');
      getByText('추가');
    });

    it('할 일 목록을 화면에 표시한디', () => {
      const { container } = renderPage(tasks);

      expect(container).toHaveTextContent('아무거나 추가하기');
      expect(container).toHaveTextContent('완료');
    });
  });

  context('할 일이 없을 때', () => {
    const tasks = [];

    it('"할 일이 없어요!"를 표시한다', () => {
      const { container } = renderPage(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
