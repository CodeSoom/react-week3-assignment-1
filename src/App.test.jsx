import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('App', () => {
    const taskTitle = '테스트코드만들기';
    const tasks =  {
            id: 1,
            title: '코드숨 공부하기',
    };

    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();

    const { container, getByText } = render((
        <App
            taskTitle={taskTitle}
            onChangeTitle={handleChangeTitle}
            onClickAddTask={handleClickAddTask}
            tasks={tasks}
            onClickDeleteTask={handleClickDeleteTask}
        />
    ));
    
    expect(container).toHaveTextContent('할 일이 없어요!');
    
    expect(handleChangeTitle).not.toBeCalled();  
    
    expect(handleClickAddTask).not.toBeCalled();
    fireEvent.click(getByText('추가'));

    expect(handleClickDeleteTask).not.toBeCalled();
    fireEvent.click(getByText('완료'));


  
});