import ReactDOM from 'react-dom';
import App from './App';

jest.mock('react-dom', () => ({ render: jest.fn() }));

it('Application root', () => {
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);

  ReactDOM.render(<App />, div);

  expect(ReactDOM.render).toHaveBeenCalledWith(<App />, div);
});
