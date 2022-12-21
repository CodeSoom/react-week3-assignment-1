import { render, fireEvent } from '@testing-library/react';

import App from './App';
import items from './__fixtures__/items';

describe('App', () => {
  const renderApp = () => render((<App />));

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

  it('renders new value when change input', () => {
    const { getByRole } = renderApp();

    fireEvent.change(getByRole('textbox'), { target: { value: 'study' } });

    expect(getByRole('textbox')).toHaveValue('study');
  });

  it('renders empty input when click add', () => {
    const { container, getByRole, getByText } = renderApp();

    fireEvent.change(getByRole('textbox'), { target: { value: 'study' } });
    fireEvent.click(getByText('추가'));

    expect(getByRole('textbox')).toHaveValue('');

    expect(container).not.toHaveTextContent('할 일이 없어요!');
  });

  context('without task', () => {
    it('renders "할 일이 없어요!"', () => {
      const { container } = renderApp();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('renders tasks', () => {
      const { container, getByRole, getByText } = renderApp();

      items.forEach(({ title }) => {
        fireEvent.change(getByRole('textbox'), { target: { value: title } });
        fireEvent.click(getByText('추가'));
        expect(container).toHaveTextContent(title);
      });
    });

    it('handles click delete', () => {
      const { container, getByRole, getByText } = renderApp();

      items.forEach(({ title }) => {
        fireEvent.change(getByRole('textbox'), { target: { value: title } });
        fireEvent.click(getByText('추가'));
        fireEvent.click(getByText('완료'));

        expect(container).toHaveTextContent('할 일이 없어요!');
      });
    });
  });
});
