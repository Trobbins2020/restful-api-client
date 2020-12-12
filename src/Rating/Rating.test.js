import React from 'react';
import ReactDOM from 'react-dom';
import Rating from './Rating';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    value: 3
  }
  ReactDOM.render(<Rating {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
