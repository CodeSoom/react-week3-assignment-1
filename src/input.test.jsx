/* 계획
 * 1. input을 입력하면 값이 잘 바뀌는지
 * 2. 추가 버튼을 눌렀을 때 이벤트가 잘 전달되는지
 */

import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  // describe(테스트 대상) - context(with, when, without) - it(기대하는 결과)

  context('When value changes according to the input', () => {
    it('renders task', () => {
      const task = '과제 하기'

      const handleChange = jest.fn();
      const { container } = render(<Input value={task} onChange={handleChange} />);

      fireEvent.change(container, {value : '과제 하기'});
    })
  })

  describe('Clicking 추가 button', () => {
    it('calls onClickAdd handler', () => {
      const task = '과제 하기'
      const handleClick = jest.fn();
      const { getByText, container, getByPlaceholderText } = render(<Input defaultValue={task} onClick={handleClick}/>);

      const AddButton = getByText('추가');
      fireEvent.click(AddButton);
      expect(handleClick).toBeCalled();
      expect(getByPlaceholderText('할 일을 입력해 주세요').value).toBe('');
    });
  });
})