import { render } from '@testing-library/react';
import Input from './Input';

test('Input', () => {
	const { container, getByPlaceholderText } = render((
		<Input 
		
		/>
	));
	expect(container).getByPlaceholderText('할 일을 입력해 주세요');
});