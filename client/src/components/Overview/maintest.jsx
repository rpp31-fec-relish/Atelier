import React from 'react';
import { render, screen } from '@testing-library/react';

import Overview from './main.jsx';

describe('Overview', () => {
  test('Renders Overview Component', () => {
    render(<Overview />);
    screen.debug();
  });
});