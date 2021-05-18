import Input from './Input';

function input(x){
    return x;
  }
  
  test('input', () => {
    expect(input('코드숨 공부하기')).toBe('코드숨 공부하기');
  });
  