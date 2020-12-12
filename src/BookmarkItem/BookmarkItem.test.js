import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BookmarkItem from './BookmarkItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    id: '123',
    title: 'test title',
    url: 'test url',
    desciption: 'test desciption',
    rating: 1,
    onClickDelete: () => {},
  }
  ReactDOM.render(
    <BrowserRouter>
      <BookmarkItem {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
