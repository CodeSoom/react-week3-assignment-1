import { render, fireEvent, screen } from '@testing-library/react';

import App from './App';

describe('<App />', () => {
  const renderApp = () => {
    const result = render((<App />));

    return {
      ...result,
      changeInput: (value) => {
        const element = result.getByLabelText('할 일');
        fireEvent.change(element, {
          target: {
            value,
          },
        });
      },
    };
  };

  it('App 컴포넌트가 랜더링된다', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일이 없어요!');
    expect(container).toHaveTextContent('추가');
  });

  context('할 일이 있을 시', () => {
    it('"삭제" 버튼이 랜더링된다', () => {
      const { container, changeInput } = renderApp();

      changeInput('누워있기');

      fireEvent.click(screen.getByRole('button', { name: '추가' }));
      fireEvent.click(screen.getByRole('button', { name: '완료' }));

      expect(container).not.toHaveTextContent('누워있기');
    });
  });

  context('할 일이 없을 시', () => {
    it('할 일이 없어요! 메시지가 보인다', () => {
      const tasks = [];
      const { getByText } = renderApp(tasks);

      expect(getByText(/할 일이 없어요!/)).not.toBeNull();
    });

    context('할 일을 입력하면', () => {
      it('onChange가 실행된다', () => {
        const { changeInput } = renderApp();
        changeInput('누워있기');

        expect(screen.getByLabelText('할 일').value).toBe('누워있기');

        changeInput('잠자기');

        expect(screen.getByLabelText('할 일').value).toBe('잠자기');
      });

      it('추가 버튼이 랜더링된다', () => {
        const { container, changeInput } = renderApp();
        changeInput('누워있기');

        fireEvent.click(screen.getByRole('button', { name: '추가' }));

        expect(container).toHaveTextContent('누워있기');
      });
    });
  });
});
