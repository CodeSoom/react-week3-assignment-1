import { render } from '@testing-library/react';

import App from './App';
import Page from './Page';

describe('App', () => {
    const mockFn = jest.fn();

    beforeEach(() => {
        mockFn.mockImplementation(() => ({
            newId: 100,
            taskTitle: '',
            tasks: [],
        }));
    });

    it('App for handleChangeTitle', () => {
        const handleChange = jest.fn();

        handleChange.mockImplementation((event) => ({
            taskTitle: event.target.value,
        }));

        render(<App onChange={handleChange} />);
    });

    it('App for handleClick', () => {
        const handleClick = jest.fn();
        const newId = 100;
        const taskTitle = '뭐라도 하기';
        const tasks = [
            { id: 100, title: '뭐라도 하기' },
        ];

        handleClick.mockImplementation((id) => ({
            newId: newId + 1,
            taskTitle: '',
            tasks: [{ id: newId, title: taskTitle }],
            tasks: tasks.filter((task) => task.id !== id),
        }));

        render(<App onClick={handleClick} />);
    });

    it('App for Page', () => {
        const handleChange = jest.fn();
        const handleClick = jest.fn();
        const tasks = [];
        const taskTitle = '';

        const { container } = render(
            <Page
                tasks={tasks}
                onClickDeleteTask={handleClick}
                taskTitle={taskTitle}
                onClickAddTask={handleClick}
                onChangeTitle={handleChange}
            />,
        );

        expect(container).toHaveTextContent('To-do');
        expect(container).toHaveTextContent('할 일');
        expect(container).toHaveTextContent('추가');
        expect(container).toHaveTextContent('할 일이 없어요!');
    });
});
