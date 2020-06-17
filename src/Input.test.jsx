import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input /> ', () => {
  it('input과 button으로 이루어져 있는지 확인한다.', () => {
    const { getByText, getByPlaceholderText } = render(<Input />);
    getByText('할 일');
    getByText('추가');
    getByPlaceholderText('할 일을 입력해 주세요');
  });

  it('change 이벤트가 발생하면 value의 값이 바뀐다.', () => {
    const { getByPlaceholderText } = render(<Input />);
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value: '자바스크립트 공부하기',
      },
    });
    expect(input.value).toBe('자바스크립트 공부하기');
  });

  it('추가 버튼을 누르면 handleClickAddTask 이벤트가 호출된다.', () => {
    const handleClickAddTask = jest.fn();
    const { getByText } = render((
      <Input onClick={handleClickAddTask} />
    ));

    expect(handleClickAddTask).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClickAddTask).toBeCalled();
  });
});
