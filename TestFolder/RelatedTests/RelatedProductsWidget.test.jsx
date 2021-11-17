import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedProductsWidget from '../../client/src/components/Related/RelatedProductsWidget.jsx';
import React from 'react';

describe('Related Products Widget', () => {
  test('debug test', () => {
    render(<RelatedProductsWidget currentProduct={'59555'} relatedProduct={['59355']}/>);
    screen.debug();
    // const textElement = screen.getByText('Category');
    // expect(textElement).toBeInTheDocument();
  })
})