import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  test('Label을 확인한다', () => {
    const { container } = render(
      <Input
        value=""
        onChange={handleChange}
        onClick={handleClick}
      />,
    );

    expect(container).toHaveTextContent('할 일');
  });

  test('버튼 텍스트를 확인한다', () => {
    const { container } = render(
      <Input
        value=""
        onChange={handleChange}
        onClick={handleClick}
      />,
    );

    expect(container).toHaveTextContent('추가');
  });

  context('입력이 없을 때', () => {
    test('placeholder를 확인한다', () => {
      const { getByRole } = render(
        <Input
          value=""
          onChange={handleChange}
          onClick={handleClick}
        />,
      );

      expect(getByRole('textbox')).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
    });

    test('handleChange()가 호출되지 않는다', () => {
      render(
        <Input
          value=""
          onChange={handleChange}
          onClick={handleClick}
        />,
      );

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  context('입력이 있을 때', () => {
    test('handleChange()가 호출된다', () => {
      const { getByRole } = render(
        <Input
          value=""
          onChange={handleChange}
          onClick={handleClick}
        />,
      );

      fireEvent.change(getByRole('textbox'), {
        target: { value: '산책하기' },
      });

      expect(handleChange).toHaveBeenCalled();
    });
  });

  context('추가버튼을 클릭하지 않으면', () => {
    test('handleClick()가 호출되지 않는다', () => {
      render(
        <Input
          value=""
          onChange={handleChange}
          onClick={handleClick}
        />,
      );

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  context('추가버튼을 클릭하면', () => {
    test('handleClick()가 호출된다', () => {
      const { getByRole } = render(
        <Input
          value="산책하기"
          onChange={handleChange}
          onClick={handleClick}
        />,
      );

      fireEvent.click(getByRole('button'));

      expect(handleClick).toHaveBeenCalled();
    });
  });
});
