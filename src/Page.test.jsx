import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  it('할 일이 없을 때는 빈 메시지를 출력한다', () => {
    const tasks = [];
  
    const { container, getByPlaceholderText, getByText } = render((
      <Page tasks={tasks} />
    ));
  
    const inputTodo = getByPlaceholderText('할 일을 입력해 주세요');
    const list = getByText('할 일이 없어요!');
  
    expect(container).toHaveTextContent('To-do');
    expect(inputTodo).toHaveAttribute('value', '');
    expect(list).toHaveTextContent('할 일이 없어요!');
  });
  
  it('추가 버튼 클릭 시 추가된 입력값이 보임', () => {
    const tasks = [{
      id: 1,
      title: '뭐라도 하기',
    }];
  
    const { container, getByText } = render((
      <Page tasks={tasks} />
    ));
  
    const addButton = getByText('추가');
    fireEvent.click(addButton);
  
    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');
  });  
});
