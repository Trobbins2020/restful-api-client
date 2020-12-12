import React from 'react';
import ReactDOM from 'react-dom';
import EditBookmark from './EditBookmark';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    },
  }
  ReactDOM.render(<EditBookmark {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
