const helperFunctions = {

  //
  // API interaction functions.
  // Note: these functions return a promise that, when resolved, contains
  // the information requested. (Since they'll have to make network calls async)
  //
  getProductById(product_id) {
    // I: A product id number or string
    // O: A promise resolving to a product object
    return fetch(`./api/products/${product_id}`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.error('Error retrieving product from the server: ', err);
    });

  },

  getProductList(pageNumber = 1, resultsPerPage = 5) {
    // I: A ?page number and ?number of results per page.  Defaults to first page and
    //    5 results per page
    // O: A promise resolving to an array of (<= resultsPerPage) product objects, starting
    //    at (pageNumber*resultsPerPage+1)
    return fetch(`./api/products?page=${pageNumber}&count=${resultsPerPage}`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.error('Error retrieving list of products from the server: ', err);
    });

  },

  getProductStylesById(product_id) {
    // I: A product id number or string
    // O: A promise resolving to an array of product styles
    return fetch(`./api/products/${product_id}/styles`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      if (!object.results) {
        throw new Error('Response from the server did not contain a results property');
      } else if (object.product_id != product_id ){
        throw new Error(`Server responded with styles for a different product.  Expected: ${product_id}, Received: ${object.product_id}`);
      } else {
        return object.results;
      }
    })
    .catch((err) => {
      console.error('Error retrieving styles from the server: ', err);
    });

  },

  getRelatedProductIdsById(product_id) {
    // I: A product id number or string
    // O: A promise resolving to an array of product ids corresponding to related products
    return fetch(`./api/products/${product_id}/related`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.error('Error retrieving related product ids from the server: ', err);
    });
  },

  getRelatedProductsById(product_id) {
    // I: A product id number or string
    // O: A promise resolving to an array of product ids corresponding to related products
    //
    // does not correspond to a specific API call, but it resolves the previous method to
    // an array of product objects rather than an array of product_ids
    //
    // this will take a while to resolve, lots of API calls
    return this.getRelatedProductIdsById(product_id)
    .then((response) => {
      return Promise.all(response.map(id => this.getProductById(id)));
    });

  },

}



export default helperFunctions;