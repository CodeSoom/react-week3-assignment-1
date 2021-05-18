import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('List', () => {
     const task = [{
         id:1,
         title: '코드숨'},
     ];

    const handleClick = jest.fn();

    const { container, getByText } = render((
        <List
          tasks={task}
          onClickDelete={handleClick}
        />
    ));

    // 1. 코드숨 완료가 생긴다. 
    expect(container).toHaveTextContent('코드숨');
    expect(container).toHaveTextContent('완료');
 
    // 2.완료 버튼을 눌렀을 떄 task.title =>'코드숨' 이 사라지고,
    // '할 일이 없어요!' 가 출력된다.
    
    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('완료'));
  
    expect(handleClick).toBeCalledWith(1);
  
    expect(container).toHaveTextContent('할 일이 없어요!');  
        
});