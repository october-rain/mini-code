import React from 'react';
import ReactDOM from 'react-dom/client';
import { AntdForm } from './pages/AntdForm';
import { MiniRCFieldForm } from './pages/MiniRCFieldForm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <AntdForm /> */}
    <MiniRCFieldForm />
  </React.StrictMode>
);