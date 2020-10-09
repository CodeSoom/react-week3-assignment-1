import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Input Component', () => {
  const titleLabel = '할 일';
  const placeholder = '할 일을 입력해 주세요';
  const buttonText = '추가';

  const userEnterValue = '뭐라도 하자!';

  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const init = ({
    value = '',
    onClick = handleClick,
    onChange = handleChange,
  }) => {
    const utils = render((
      <Input
        value={value}
        onClick={onClick}
        onChange={onChange}
      />
    ));
    return { ...utils };
  };

  test('main label test', () => {
    const { container } = init({});
    expect(container).toHaveTextContent(titleLabel);
  });

  context('without input value', () => {
    it('test input shows placeholder', () => {
      const { getByPlaceholderText } = init({});
      getByPlaceholderText(placeholder);
    });

    it('test handler click button', () => {
      const { getByText } = init({});

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText(buttonText));

      expect(handleClick).toBeCalledTimes(1);
    });
  });

  context('test input shows value', () => {
    it('test input value', () => {
      const { getByDisplayValue } = init({ value: userEnterValue });
      getByDisplayValue(userEnterValue);
    });

    it('test handler change input value', () => {
      const { getByPlaceholderText } = init({});

      expect(handleChange).not.toBeCalled();

      fireEvent.change(
        getByPlaceholderText(placeholder),
        { target: { value: userEnterValue } },
      );

      expect(handleChange).toBeCalledTimes(1);
    });

    it('test handler click button', () => {
      const { getByText } = init({ value: userEnterValue });

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText(buttonText));

      expect(handleClick).toBeCalledTimes(1);
    });
  });
});
