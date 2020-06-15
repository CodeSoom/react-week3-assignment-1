import React from 'react';

import { render } from '@testing-library/react';
import Page from './Page';

describe('<Page />', () => {

  context('로딩 되면', () => {
    it('"To-do" 타이틀이 있다.', () => {
      const { getByText } = render(<Page tasks={[]} />);
      expect(getByText('To-do')).toBeTruthy();
    });
    it('<Input />이 렌더링 됐다.', () => {
      const { getByText } = render(<Page tasks={[]} />);
      expect(getByText('할 일')).toBeTruthy();
    });
    it('<List />가 렌더링 됐다.', () => {
      const { getByText } = render(<Page tasks={[]} />);
      expect(getByText('할 일이 없어요!')).toBeTruthy();
    });
  });
});
