import { FC } from 'react';
import { Calculator } from './components/Calculator/';

import './styles/index.scss';

export const App: FC = () => (
  <div className='container'>
    <h1>Give Interactive Calculator</h1>
    <Calculator />
  </div>
);
