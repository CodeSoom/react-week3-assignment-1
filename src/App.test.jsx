import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render((<App />));

  context('when first render', () => {
    it('renders "To-do"', () => {
      const { container } = renderApp();

      expect(container).toHaveTextContent('To-do');
    });

    it('renders Input', () => {
      const { getByRole, getByText } = renderApp();

      expect(getByRole('textbox')).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
      expect(getByText('추가')).toBeInTheDocument();
    });

    it('renders List', () => {
      const { container } = renderApp();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('when change input', () => {
    it('renders change input', () => {
      const { getByRole } = renderApp();

      fireEvent.change(getByRole('textbox'), { target: { value: 'study' } });

      expect(getByRole('textbox')).toHaveValue('study');
    });

    it('handles click add', () => {
      const { container, getByRole, getByText } = renderApp();

      fireEvent.change(getByRole('textbox'), { target: { value: 'study' } });
      fireEvent.click(getByText('추가'));

      expect(getByRole('textbox')).toHaveValue('');

      expect(container).not.toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    const tasks = [
      {
        id: 1,
        title: 'study',
      },
      {
        id: 2,
        title: 'play',
      },
    ];

    it('renders tasks', () => {
      const { container, getByRole, getByText } = renderApp();

      tasks.forEach(({ title }) => {
        fireEvent.change(getByRole('textbox'), { target: { value: title } });
        fireEvent.click(getByText('추가'));
        expect(container).toHaveTextContent(title);
      });
    });

    it('handles click delete', () => {
      const { container, getByRole, getByText } = renderApp();

      tasks.forEach(({ title }) => {
        fireEvent.change(getByRole('textbox'), { target: { value: title } });
        fireEvent.click(getByText('추가'));
        fireEvent.click(getByText('완료'));

        expect(container).toHaveTextContent('할 일이 없어요!');
      });
    });
  });
});
