import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
    const {} = render((
        <Page
            value={taskTitle}
            onChange={onChangeTitle}
            onClick={onClickAddTask}
            tasks={tasks}
            onClickDelete={onClickDeleteTask}
        />
    ));
});
