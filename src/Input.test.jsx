import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

// 1. 입력창과 입력버튼 있는지 확인
// 2. 입력값 변화되는지 확인
// 3. 입력버튼 실행되는지 확인

function createTODO(value, onChange, onClick) {
  return render(
    <Input
      value={value}
      onChange={onChange}
      onClick={onClick}
    />,
  );
}

describe('<Input />', () => {
  const setup = (props = {}) => {
    // const { value, onChange, onClick } = props;
    const utils = createTODO(...props);
    const {
      getByText,
      getByPlaceholderText,
    } = utils;
    const input = getByPlaceholderText(
      '할 일을 입력해 주세요',
    ); // input 있는지 확인
    const inputButton = getByText('추가');
    // input-button 있는지 확인

    return {
      ...utils,
      input,
      inputButton,
    };
  };

  context('초기 할 일 프로그램을 시작할 때, ', () => {
    it('할 일을 적는 공간임을 알려주고 입력창과 입력버튼 보여주기', () => {
      const { container, input, inputButton } = setup();
      expect(container).toHaveTextContent('할 일');
      expect(input).toBeTruthy();
      expect(inputButton).toBeTruthy();
    });
  });

  context('할 일이 입력되면, ', () => {
    it('입력값이 변경된다', () => {
      const { input } = setup();
      fireEvent.change(input, {
        target: {
          value: '도분설팀프..;',
        },
      });
      expect(input.value).toHaveAttribute('value', '도분설팀프..ㅜㅜ');
    });
  });

  context('입력버튼 "추가"를 누르면, ', () => {
    it('onClick 함수를 호출한다.', () => {
      const onClick = jest.fn();
      const { getByText } = setup({ onClick });

      expect(onClick).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(onClick).toBeCalledTimes();
    });

    it('입력값이 초기화된다.', () => {
      const value = '';
      const onChange = jest.fn();
      const onClick = jest.fn();
      const { input, inputButton } = setup({ value, onChange, onClick });
      fireEvent.change(input, {
        target: {
          value: 'TDD과제 해야해ㅜㅡㅜ',
        },
      });
      fireEvent.click(inputButton);
      expect(input).toHaveAttribute('value', ''); // 입력창을 비워야함
    });
  });
});
