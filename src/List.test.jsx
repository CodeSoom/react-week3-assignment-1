import React from 'react';

import { render, waitForElementToBeRemoved } from '@testing-library/react';

import List from './List';

describe('List', () => {
  beforeEach(() => {
    const onClickDelete = jest.fn();
  });

  it('할 일이 없어요!', () => {
    const { getByText } = render(<List />);
    expect(getByText('할 일이 없어요!')).toBeInTheDocument();
  });

  it('놀기', () => {
    const tasks = {};
    expect(map(task));
  });
});
