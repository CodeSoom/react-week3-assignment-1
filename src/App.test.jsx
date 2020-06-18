import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App Test', () => {
  test('렌더링', () => {
    const { container, getByText } = render(<App />);
    const tempInputText = '내 앞에 무서운 애가 앉아있다.';

    expect(container).toHaveTextContent('할 일이 없어요!');

    fireEvent.change(container.querySelector('input'), { target: { value: tempInputText } });
    fireEvent.click(container.querySelector('button'));

    expect(container).toHaveTextContent(tempInputText);

    fireEvent.click(getByText('완료'));

    expect(container).not.toHaveTextContent(tempInputText);
  });
});
