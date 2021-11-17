import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen, act, cleanup} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import axios, { get } from 'axios';
import Related from '../../client/src/components/Related/main.jsx';
import "regenerator-runtime/runtime.js";
import helperFunctions from '../../client/src/helperFunctions.js';


afterEach(() => {
  cleanup;
  jest.resetAllMocks();
});
jest.mock('../../client/src/components/Related/main.jsx', () => ({ get: jest.fn() }));

describe('Related', () => {
  test('test truthy', () => {
    expect(true).toBe(true);
  });

  // test('renders correctly', async() => {
  //   const axiosSpy = jest.spyOn(axios, 'get');
  //   const p = Promise.resolve({
  //     data: {
  //       "currentProduct": "59555",
  //       "outfits": ["59355"]
  //     }
  //   })
  //   axios.get.mockResolvedValue(() => p)
  //   expect(axiosSpy).toHaveBeenCalledTimes(1);
  // })
})