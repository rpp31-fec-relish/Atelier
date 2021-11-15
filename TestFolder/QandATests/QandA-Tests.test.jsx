import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import QandA from '../../client/src/components/QandA/main.jsx';

test('QandAbasic', () => {
  expect(true).toBe(true);
});