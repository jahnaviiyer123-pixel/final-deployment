import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

test('renders App without crashing', () => {
  const html = ReactDOMServer.renderToString(<App />);
  expect(html.length).toBeGreaterThan(0);
  console.log('App successfully rendered! Length:', html.length);
});
