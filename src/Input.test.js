import React from 'react';

// fireEvent는 이벤트 발생 함수
// input에 이벤트 발생하면 value 값이 변한다.
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  // render
  // input.jsx paramter is value
  const renderInput = (value) => render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  // jest function인 getByLabel, getByText, getPlaceholderText을 이용해 rendering
  it('it shows start', () => {
    const { getByLabelText, getByText, getByPlaceholderText } = renderInput('');

    // toBeInDocument는 DOM에 있는지 확인하는 함수
    // 아무것도 쓰지 않은 초기화면에서
    // renderInput를 통해 <List ~/> 를 불러와
    // 설정한 초기 값이 제대로 있는지 확인한다.
    expect(getByLabelText('할 일')).toBeInTheDocument();
    expect(getByText('추가')).toBeInTheDocument();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
  });

  it('it listens changes', () => {
    const newTask = '새로 할 일';

    // default로 placeholder가 있는 부분을 새로 할 일로 바꿔준다.
    const { getByPlaceholderText } = renderInput(newTask);

    // 띄어쓰기가 달라도 인식을 못하는 구나.
    const defaultTask = getByPlaceholderText('할 일을 입력해 주세요');

    expect(handleChange).not.toBeCalled();

    // state 변경에 있어 e.target.value와 같은 동작이라 생각
    fireEvent.change(defaultTask, { target: { value: newTask } });

    expect(defaultTask).toHaveValue(newTask);
  });

  it('click', () => {
    const newTask = '새로운 할 일';

    const { getByText } = renderInput(newTask);

    expect(handleClick).not.toBeCalled();

    // click event 발생시켜 '추가'가 있는지 확인한다.
    fireEvent.click(getByText('추가'));

    // handleClick이 제대로 동작하는지 확인한다.
    expect(handleClick).toBeCalled();
  });
});
