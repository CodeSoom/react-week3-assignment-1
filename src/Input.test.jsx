import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';

import Input from './Input';

const handleChangeTitle = jest.fn();

describe('AddInput', () => {
  it('should render input element', async () => {
    render(
      <Input
        value=""
        onChange={handleChangeTitle}
        // onClick={handleClickAddTask}
      />,
    );
    const inputElement = screen.getByPlaceholderText(/할 일을 입력해 주세요/i);
    expect(inputElement).toBeInTheDocument();
  });
  it('should be able to type in input', async () => {
    render(
      <Input
        value=""
        onChange={handleChangeTitle}
        // onClick={handleClickAddTask}
      />,
    );
    const inputElement = screen.getByPlaceholderText(/할 일을 입력해 주세요/i);
    fireEvent.change(inputElement, { target: { value: '코딩을 즐기기' } });
    expect(inputElement.value).toBe('코딩을 즐기기');
  });
});
