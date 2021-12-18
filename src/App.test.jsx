import React from 'react';

import { render } from '@testing-library/react';

import App from './App';
import { tasksFixture } from './Fixture';

describe('App Component', () => {
  const { container } = render((
    <App />
  ));

  it('task타이틀을 보여준다', () => {
    // TODO
  });

  it('task추가를 한다', () => {
    // TODO
  });

  it('task삭제를 한다', () => {
    // TODO
  });
});
