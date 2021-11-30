import React from 'react';
import regeneratorRuntime from "regenerator-runtime";
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {cleanup, render, fireEvent, waitFor, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import QandA from '../../client/src/components/QandA/main.jsx';

describe('QandA component', () => {
  beforeEach(() => {cleanup()});

  test('renders QandA component', async () => {
    await act(async () => {
      await render(<QandA currentProduct={59560}/>);
      await screen.findByText('Q : How long does it last?');
    });
  });

  test('renders QandA component with more than one answer', async () => {
    await act(async () => {
      await render(<QandA currentProduct={59553}/>);
      await screen.findByText('Q : Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices?');
    });
  });

  test('Report Button working', async () => {
    await act(async () => {
      await render(<QandA currentProduct={59553}/>);
      const answers = await screen.findAllByText('Report');
      // const button =  answer.findByRole('Report');
      fireEvent.click(answers[0]);
      expect(screen.findAllByText('Reported').length === 1)
    });
  });

  test('Useful button working', async () => {
    await act(async () => {
      await render(<QandA currentProduct={59553}/>);
      const answers = await screen.findAllByText('Yes (3)');
      // const button =  answer.findByRole('Report');
      fireEvent.click(answers[0]);
      expect(screen.findAllByText('Yes (4)').length === 1)
    });
  });

});