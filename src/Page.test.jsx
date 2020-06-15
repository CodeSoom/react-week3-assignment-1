import React from 'react';
import { render } from '@testing-library/react';
import Page from './Page';

describe('<Page />', () => {
  it('"To-do" 타이틀이 있다.', () => {
    const { getByText } = render(<Page tasks={[]} />);
    getByText('To-do');
  });

  it('<Input />과 <List />가 렌더링 됐다.', () => {
    const { getByText } = render(<Page tasks={[]} />);
    getByText('할 일');
    getByText('할 일이 없어요!');
  });
});
