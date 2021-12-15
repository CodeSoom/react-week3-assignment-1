import { render } from '@testing-library/react';

import Page from './Page';
import Input from './Input';
import List from './List';

test('Page', () => {
    const tasks = [];
    const handleClick = jest.fn();
    const taskTitle = '';
    const handleChange = jest.fn();

    const { container } = render(
        <Page
            tasks={tasks}
            onClickDeleteTask={handleClick}
            taskTitle={taskTitle}
            onClickAddTask={handleClick}
            onChangeTitle={handleChange}
        />,
        <Input
            taskTitle={taskTitle}
            onClickAddTask={handleClick}
            onChangeTitle={handleChange}
        />,
        <List
            tasks={tasks}
            onClickDeleteTask={handleClick}
        />,
    );

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
    expect(container).toHaveTextContent('할 일이 없어요!');
});
