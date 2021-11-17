import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Related from '../../client/src/components/Related/main.jsx';

jest.mock('axios');

describe('Related', () => {
  test('Related', () => {
    expect(true).toBe(true);
  });
})