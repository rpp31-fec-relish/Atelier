/**
 * @jest-environment jsdom
 */

import React from 'react';
import axios from 'axios';
import { render, screen, act } from '@testing-library/react';

import Overview from '../../client/src/components/Overview/main.jsx';

// jest.mock('axios');

// const fakeProductResult = {
//   data: {
//     campus: "hr-rpp",
//     category: "Jackets",
//     created_at: "2021-10-18T22:50:41.839Z",
//     default_price: "140.00",
//     description: "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
//     features: [
//       {feature: 'Fabric', value: 'Canvas'},
//       {feature: 'Buttons', value: 'Brass'}
//     ],
//     id: 59553,
//     name: "Camo Onesie",
//     slogan: "Blend in to your crowd",
//     updated_at: "2021-10-18T22:50:41.839Z"
//   }
// };

// const fakeProductStylesResult = {
//   data: {
//     results: [{
//       'default?': true,
//       name: "Forest Green & Black",
//       original_price: "140.00",
//       photos: [{
//           thumbnail_url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
//         },
//         {
//           thumbnail_url: "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           url: "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
//         },
//         {
//           thumbnail_url: "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           url: "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
//         },
//         {
//           thumbnail_url: "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
//         url: "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
//         },
//         {
//           thumbnail_url: "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           url: "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
//         },
//         {
//           thumbnail_url: "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           url: "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
//         }
//       ],
//       sale_price: null,
//       skus: {
//         2122777: {quantity: 8, size: 'XS'},
//         2122778: {quantity: 16, size: 'S'},
//         2122779: {quantity: 17, size: 'M'},
//         2122780: {quantity: 10, size: 'L'},
//         2122781: {quantity: 15, size: 'XL'},
//         2122782: {quantity: 4, size: 'XL'},
//       },
//       style_id: 365413
//     },
//     {
//       'default?': false,
//       name: "Desert Brown & Tan",
//       original_price: "140.00",
//       photos: [{
//           thumbnail_url: "https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           url: "https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
//         },
//         {
//           thumbnail_url: "https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           url: "https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
//         },
//         {
//           thumbnail_url: "https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           url: "https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
//         },
//         {
//           thumbnail_url: "https://images.unsplash.com/photo-1422557379185-474fa15bf770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           url: "https://images.unsplash.com/photo-1422557379185-474fa15bf770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
//         },
//         {
//           thumbnail_url: "https://images.unsplash.com/photo-1490723286627-4b66e6b2882a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           url: "https://images.unsplash.com/photo-1490723286627-4b66e6b2882a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
//         },
//         {
//           thumbnail_url: "https://images.unsplash.com/photo-1447958272669-9c562446304f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           url: "https://images.unsplash.com/photo-1447958272669-9c562446304f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2800&q=80"
//         }
//       ],
//       sale_price: null,
//       skus: {
//         2122783: {quantity: 8, size: 'XS'}
//         2122784: {quantity: 16, size: 'S'}
//         2122785: {quantity: 17, size: 'M'}
//         2122786: {quantity: 10, size: 'L'}
//         2122787: {quantity: 15, size: 'XL'}
//         2122788: {quantity: 6, size: 'XXL'}
//       },
//       style_id: 365414
//     },
//     {
//       2:
//       default?: false
//       name: "Ocean Blue & Grey"
//       original_price: "140.00"
//       photos: Array(6)
//       0:
//       thumbnail_url: "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
//       url: "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2761&q=80"
//       [[Prototype]]: Object
//       1:
//       thumbnail_url: "https://images.unsplash.com/photo-1544131750-2985d621da30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
//       url: "https://images.unsplash.com/photo-1544131750-2985d621da30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80"
//       [[Prototype]]: Object
//       2:
//       thumbnail_url: "https://images.unsplash.com/photo-1557760257-b02421ae77fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
//       url: "https://images.unsplash.com/photo-1557760257-b02421ae77fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
//       [[Prototype]]: Object
//       3:
//       thumbnail_url: "https://images.unsplash.com/photo-1551506448-074afa034c05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
//       url: "https://images.unsplash.com/photo-1551506448-074afa034c05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=938&q=80"
//       [[Prototype]]: Object
//       4:
//       thumbnail_url: "https://images.unsplash.com/photo-1556268652-ad74ebb8f1e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
//       url: "https://images.unsplash.com/photo-1556268652-ad74ebb8f1e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
//       [[Prototype]]: Object
//       5:
//       thumbnail_url: "https://images.unsplash.com/photo-1557394976-32cc983558ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
//       url: "https://images.unsplash.com/photo-1557394976-32cc983558ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
//       [[Prototype]]: Object
//       length: 6
//       [[Prototype]]: Array(0)
//       sale_price: "100.00"
//       skus:
//       2122789: {quantity: 8, size: 'XS'}
//       2122790: {quantity: 16, size: 'S'}
//       2122791: {quantity: 17, size: 'M'}
//       2122792: {quantity: 10, size: 'L'}
//       2122793: {quantity: 15, size: 'XL'}
//       2122794: {quantity: 6, size: 'XXL'}
//       [[Prototype]]: Object
//       style_id: 365415
//       [[Prototype]]: Object
//     }
// 3:
// default?: false
// name: "Digital Red & Black"
// original_price: "140.00"
// photos: Array(6)
// 0:
// thumbnail_url: "https://images.unsplash.com/photo-1530092376999-2431865aa8df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1530092376999-2431865aa8df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
// [[Prototype]]: Object
// 1:
// thumbnail_url: "https://images.unsplash.com/photo-1487174244970-cd18784bb4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1487174244970-cd18784bb4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"
// [[Prototype]]: Object
// 2:
// thumbnail_url: "https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
// [[Prototype]]: Object
// 3:
// thumbnail_url: "https://images.unsplash.com/photo-1486025402772-bc179c8dfb0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1486025402772-bc179c8dfb0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
// [[Prototype]]: Object
// 4:
// thumbnail_url: "https://images.unsplash.com/photo-1473691955023-da1c49c95c78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1473691955023-da1c49c95c78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
// [[Prototype]]: Object
// 5:
// thumbnail_url: "https://images.unsplash.com/photo-1517456837005-d757b959ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60"
// url: "https://images.unsplash.com/photo-1517456837005-d757b959ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
// [[Prototype]]: Object
// length: 6
// [[Prototype]]: Array(0)
// sale_price: null
// skus:
// 2122795: {quantity: 8, size: 'XS'}
// 2122796: {quantity: 16, size: 'S'}
// 2122797: {quantity: 17, size: 'M'}
// 2122798: {quantity: 10, size: 'L'}
// 2122799: {quantity: 15, size: 'XL'}
// 2122800: {quantity: 6, size: 'XXL'}
// [[Prototype]]: Object
// style_id: 365416
// [[Prototype]]: Object
// 4:
// default?: false
// name: "Sky Blue & White"
// original_price: "140.00"
// photos: Array(6)
// 0:
// thumbnail_url: "https://images.unsplash.com/photo-1448526478325-616f2b15b04e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1448526478325-616f2b15b04e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
// [[Prototype]]: Object
// 1:
// thumbnail_url: "https://images.unsplash.com/photo-1519098635131-4c8f806d1e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1519098635131-4c8f806d1e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
// [[Prototype]]: Object
// 2:
// thumbnail_url: "https://images.unsplash.com/photo-1483056293146-9eac9521932f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1483056293146-9eac9521932f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
// [[Prototype]]: Object
// 3:
// thumbnail_url: "https://images.unsplash.com/photo-1515992854631-13de43baeba1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1515992854631-13de43baeba1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
// [[Prototype]]: Object
// 4:
// thumbnail_url: "https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
// [[Prototype]]: Object
// 5:
// thumbnail_url: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
// [[Prototype]]: Object
// length: 6
// [[Prototype]]: Array(0)
// sale_price: "100.00"
// skus:
// 2122801: {quantity: 8, size: 'XS'}
// 2122802: {quantity: 16, size: 'S'}
// 2122803: {quantity: 17, size: 'M'}
// 2122804: {quantity: 10, size: 'L'}
// 2122805: {quantity: 15, size: 'XL'}
// 2122806: {quantity: 6, size: 'XXL'}
// [[Prototype]]: Object
// style_id: 365417
// [[Prototype]]: Object
// 5:
// default?: false
// name: "Dark Grey & Black"
// original_price: "170.00"
// photos: Array(6)
// 0:
// thumbnail_url: "https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
// [[Prototype]]: Object
// 1:
// thumbnail_url: "https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
// [[Prototype]]: Object
// 2:
// thumbnail_url: "https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80"
// [[Prototype]]: Object
// 3:
// thumbnail_url: "https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
// [[Prototype]]: Object
// 4:
// thumbnail_url: "https://images.unsplash.com/photo-1498098662025-04e60a212db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1498098662025-04e60a212db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
// [[Prototype]]: Object
// 5:
// thumbnail_url: "https://images.unsplash.com/photo-1421941027568-40ab08ee5592?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
// url: "https://images.unsplash.com/photo-1421941027568-40ab08ee5592?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
// [[Prototype]]: Object
// length: 6
// [[Prototype]]: Array(0)
// sale_price: null
// skus:
// 2122807: {quantity: 8, size: 'XS'}
// 2122808: {quantity: 16, size: 'S'}
// 2122809: {quantity: 17, size: 'M'}
// 2122810: {quantity: 10, size: 'L'}
// 2122811: {quantity: 15, size: 'XL'}
// 2122812: {quantity: 6, size: 'XXL'}
// [[Prototype]]: Object
// style_id: 365418
//     ]
//   }
// };

describe('Overview', () => {
  test('Renders Overview Component', () => {
    render(<Overview currentProduct={59553}/>);
    //screen.debug();
  });
  test('Renders after API call', () => {
    const APIResult1 = Promise.resolve();
    // axios.get.mockImplementation((url) => {
    //   if (url.includes(`api/products/`)) {
    //     if(url.includes('styles')) {
    //       // handle fetching styles
    //       //return Promise.resolve()
    //     } else {
    //       // handle fetching product info
    //     }
    //   }
    // });
  });
});