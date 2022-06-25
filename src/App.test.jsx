import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render(<App />);

  it('renders input', () => {
    const { getByRole } = renderApp();

    expect(getByRole('textbox')).toBeDefined();
  });

  it('renders new input value when input is changed', () => {
    const value = '새로운 할 일';

    const { getByRole } = renderApp();
    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value } });

    expect(input).toHaveDisplayValue(value);
  });

  context('with input value', () => {
    const value = '새로운 할 일';

    const renderAppWithInputValue = () => {
      const result = renderApp();
      const { getByRole } = result;

      fireEvent.change(getByRole('textbox'), { target: { value } });

      return result;
    };

    it('makes input empty when add button is clicked', () => {
      const { getByRole, getByText } = renderAppWithInputValue();

      fireEvent.click(getByText('추가'));

      expect(getByRole('textbox')).toHaveDisplayValue('');
    });

    it('renders title of task when add button is clicked', () => {
      const { container, getByText } = renderAppWithInputValue();

      fireEvent.click(getByText('추가'));

      expect(container).toHaveTextContent(value);
    });
  });

  context('with tasks', () => {
    const taskTitles = [
      '할 일 1',
      '할 일 2',
      '할 일 3',
      '할 일 4',
      '할 일 5',
    ];

    const renderAppWithTasks = () => {
      const result = renderApp();
      const { getByRole, getByText } = result;

      taskTitles.forEach((taskTitle) => {
        fireEvent.change(getByRole('textbox'), { target: { value: taskTitle } });
        fireEvent.click(getByText('추가'));
      });

      return result;
    };

    it('renders titles of tasks', () => {
      const { container } = renderAppWithTasks();

      taskTitles.forEach((taskTitle) => {
        expect(container).toHaveTextContent(taskTitle);
      });
    });

    it('removes tasks when complete button is clicked', () => {
      const { container, getAllByText } = renderAppWithTasks();
      const completeButton = getAllByText('완료');

      fireEvent.click(completeButton[1]);

      expect(container).not.toHaveTextContent(taskTitles[1]);
    });
  });
});
