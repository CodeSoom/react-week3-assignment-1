import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const onChange = jest.fn();
const onClick = jest.fn();

const renderInput = () => render((
  <Input
    value="테스트 코드 짜기"
    onChange={onChange}
    onClick={onClick}
  />
));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Input', () => {
  it('renders label', () => {
    const { queryByLabelText } = renderInput();

    expect(queryByLabelText('할 일')).toBeInTheDocument();
  });

  it('renders textbox to change task title', () => {
    const { getByPlaceholderText } = renderInput();

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('테스트 코드 짜기');

    expect(onChange).not.toBeCalled();

    fireEvent.change(
      getByPlaceholderText('할 일을 입력해 주세요'),
      { target: { value: '테스트 코드 작성' } },
    );

    expect(onChange).toBeCalledWith('테스트 코드 작성');
  });

  it('renders "추가" button to add task', () => {
    const { container, getByText } = renderInput();

    expect(container).toHaveTextContent('추가');

    expect(onClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(onClick).toBeCalled();
  });
});
