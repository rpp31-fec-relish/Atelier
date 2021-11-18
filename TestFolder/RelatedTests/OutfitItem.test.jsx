import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import OutfitItem from '../../client/src/components/Related/OutfitItem.jsx';
import React from 'react';

describe('Outfit Item', () => {
  test('renders when outfits array exists', () => {
    const assignImage = (imageArray) => {
      const PlaceholderPhoto = './images/missingImage.svg';

      if (imageArray) {
        if (imageArray[0].thumbnail_url) {
          return imageArray[0].thumbnail_url;
        }
      }
      return PlaceholderPhoto;
    }

    render(<OutfitItem outfits={['59555']} assignImage={assignImage}/>);
    const textElement = screen.getByText('Category');
    expect(textElement).toBeInTheDocument();
  })
})