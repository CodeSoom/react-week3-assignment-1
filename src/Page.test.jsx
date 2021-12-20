import { render } from '@testing-library/react';

import Page from './Page';

import { tasks } from '../fixtures/tasks';

describe('Page Component', () => {
  const onChangeTitle = jest.fn();

  it('render', () => {
    const { container, getByPlaceholderText } = render((
      <Page
        taskTitle=""
        onChangeTitle={onChangeTitle}
        tasks={tasks}
      />
    ));

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    expect(container).toHaveTextContent('To-do');
    expect(input).toBeInTheDocument();
    expect(container).toHaveTextContent('추가');
    expect(container).toHaveTextContent('아무 것도 하지 않기');
    expect(container).toHaveTextContent('코드숨 과제하기');
  });
});
