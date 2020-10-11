/*
 * TODO:
 * 1. 렌더링 되면 할 일 이라는 입력창 안내 글이 보여야 한다.
 * 2. 렌더링 되면 입력창이 있고 할 일을 입력해 주세요 라는 안내글이 보여야 한다.
 * 3. 렌더링 되면 추가 라는 텍스트의 버튼이 보여야 한다.
 * 4. TDD 학습하기 라는 글을 쓰면 입력창에 값이 입력이 된다.
 * 5. 추가 버튼을 클릭하면 입력값을 할일 목록에 저장한다.
 * 6. 추가 버튼을 클릭하면 입력창에 있는 입력값이 없어지고 다시 안내글이 보여야 한다.
​ */

import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const renderHelper = (taskTitle = '') => render((
    <Input
      value={taskTitle}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));
  context('입력값이 없을 때', () => {
    it('할 일을 입력해 주세요 라는 placeholder 값을 보여준다', () => {
      const { getByPlaceholderText } = renderHelper();

      const inputNode = getByPlaceholderText('할 일을 입력해 주세요');

      expect(inputNode).toBeTruthy();
    });
  });

  context('입력값이 있을 때', () => {
    it('입력창에 입력된 값을 보여 준다', () => {
      const { getByPlaceholderText } = renderHelper('뭐라도 하기');

      const InputNode = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(
        InputNode, {
          target: { value: '뭐라도 하기' },
        },
      );

      expect(InputNode).toHaveProperty('value', '뭐라도 하기');
    });

    it('추가 버튼을 클릭하면 글이 추가 된다', () => {
      const { getByText } = renderHelper('뭐라도 하기');

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalled();
    });
  });
});
