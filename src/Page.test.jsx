import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page component', () => {
  const onChangeTitle = jest.fn();
  const tasks = [
    {
      id: 102,
      title: 'say somthing',
    },
  ];
  const renderPageComponent = (taskTitle) =>
    render(
      <Page tasks={tasks} taskTitle={taskTitle} onChangeTitle={onChangeTitle} />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("h1 tag text is 'To-do'", () => {
    const { getByText } = renderPageComponent();
    expect(getByText('To-do')).toBeInTheDocument();
  });

  it('taskTitle value should be changed', () => {
    const { getByDisplayValue } = renderPageComponent('somthing good');
    expect(getByDisplayValue('somthing good')).toBeInTheDocument();
  });

  it('taskTitle value should be output to the screen when onChange event occured', () => {
    const { getByPlaceholderText } = renderPageComponent();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: { value: '자기 전에 스트레칭하기' },
    });

    expect(onChangeTitle).toHaveBeenCalledTimes(1);
  });
});
