import React from 'react';

import { render } from '@testing-library/react';

import Input from './Input';
import List from './List';

describe('Page Input', () => {
  context('when Page loaded', () => {
    it('display Input component', () => {
      const PLACEHOLDER = '할 일을 입력해 주세요';

      const { getByPlaceholderText, getByText } = render((
        <Input />
      ));

      const input = getByPlaceholderText(PLACEHOLDER);
      const button = getByText('추가');

      expect(input.id).toBe('input-task-title');

      expect(button).toBeInTheDocument();
    });
  });
});

describe('Page List', () => {
  context('when Page loaded', () => {
    it('display List component', () => {
      const { queryByText } = render((
        <List
          tasks={[]}
        />
      ));

      const list = queryByText('할 일이 없어요!');

      expect(list).toBeInTheDocument();
    });
  });
});
