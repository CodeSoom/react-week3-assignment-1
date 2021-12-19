/* 계획
 * 1. input을 입력하면 값이 잘 바뀌는지
 * 2. 추가 버튼을 눌렀을 때 이벤트가 잘 전달되고 인풋이 초기화 되는지
 */

import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

import {screen} from '@testing-library/dom'

describe('Input', () => {
  // describe(테스트 대상) - context(with, when, without) - it(기대하는 결과)
  const task = '과제 하기'
  context('When value changes', () => {
    it('Input changes', () => {
      const handleChange = jest.fn();
      const { getByPlaceholderText } = render(<Input value="" onChange={handleChange} />);

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      fireEvent.change(input, {target : {value : task}});
      expect(handleChange).toBeCalled();           
    })
  })

  describe('When Add button is Clicked', () => {
    it('Input initialize', () => {
      const handleClick = jest.fn();
      const { getByText, getByPlaceholderText } = render(<Input defaultValue={task} onClick={handleClick}/>);

      const AddButton = getByText('추가');
      fireEvent.click(AddButton);
      expect(handleClick).toBeCalled();
      expect(getByPlaceholderText('할 일을 입력해 주세요').value).toBe('');
    });
  });
})