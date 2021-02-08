import React from 'react';

import { render } from '@testing-library/react';

import Page from './App';

test('Page', () => {
    const tasks = [
            {id: 1, title: 'Task-1'},
            {id: 2, title: 'Task-2'},
    ];

    const {getByText} = render ((
        <Page 
            tasks={tasks}
        />
    ));

    expect(getByText(/Task-1/)).not.toBeNull();
});