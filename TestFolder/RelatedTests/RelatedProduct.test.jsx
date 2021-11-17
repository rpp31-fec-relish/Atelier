import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedProduct from '../../client/src/components/Related/RelatedProduct.jsx';
import React from 'react';

describe('Related Product Item', () => {
  test('debug test', () => {
    const assignImage = (imageArray) => {
      const PlaceholderPhoto = './images/missingImage.svg';

      if (imageArray) {
        if (imageArray[0].thumbnail_url) {
          return imageArray[0].thumbnail_url;
        }
      }
      return PlaceholderPhoto;
    }

    render(<RelatedProduct currentProduct={'59555'} assignImage={assignImage}/>);
    screen.debug();
    // const textElement = screen.getByText('Category');
    // expect(textElement).toBeInTheDocument();
  })
})