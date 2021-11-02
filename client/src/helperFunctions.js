const helperFunctions = {

  //
  // API interaction functions.
  // Note: these functions return a promise that, when resolved, contains
  // the information requested. (Since they'll have to make network calls async)
  //
  // Function List:
  // getProductById(product_id);
  // getProductList(?pageNumber, ?resultsPerPage);
  // getProductStylesById(product_id);
  // getRelatedProductIdsById(product_id);
  // getRelatedProductsById(product_id); <-- expensive function, multiple API calls
  //

  //
  // PRODUCTS:
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
    // I: An optional ?page number and optional ?number of results per page.  Defaults to first page and
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

  //
  // REVIEWS:
  //

  getReviewsById(product_id, page = 1, count = 5, sort = 'newest') {
    // I: A product id number or string, optionally a ?page number, ?count per page, and ?sort order
    // O: A promise resolving to an array of review objects for the provided product_id.
    if (sort != 'newest' && sort != 'helpful' && sort != 'relevant') {
      return new Error('sort parameter must be \'newest\', \'helpful\' or \'relevant\'');
    }
    return fetch(`./api/reviews?product_id=${product_id}&page=${page}&count=${count}&sort=${sort}`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      if (!object.results) {
        throw new Error('Response from the server did not contain a results property');
      } else if (object.product != product_id ){
        throw new Error(`Server responded with styles for a different product.  Expected: ${product_id}, Received: ${object.product}`);
      } else {
        return object.results;
      }
    })
    .catch((err) => {
      console.error('Error retrieving reviews from the server: ', err);
    });

  },

  getReviewsMetaById(product_id) {
    // I: A product id number or string
    // O: A promise resolving to an array containing the metadata of reviews of the provided product

    return fetch(`./api/reviews/meta?product_id=${product_id}`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.error('Error retrieving reviews metadata from the server: ', err);
    });

  },

  postReview(review) {
    // I: A review object with parameters:
    //  product_id (int),
    //  rating (int),
    //  ?summary (string),
    //  body (string),
    //  recommend (bool),
    //  name (string),
    //  email (string),
    //  ?photos (array of strings),
    //  characteristics (object of key=characteristic_id value=int)
    // O: A promise which will resolve with '201' if successfully posted
    if (!review.product_id || !review.rating || !review.body || !review.recommend || !review.name || !review.email || !review.characteristics) {
      return new Error('review object missing required parameter');
    }
    console.log('review: ', JSON.stringify(review));
    return fetch('./api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
    .then((response) => {
      return response.statusCode;
    })
    .catch((err) => {
      console.error('Error posting new review to the server: ', err);
    });

  },

  markReviewHelpfulById(review_id) {
    // I: A review id number or string
    // O: A promise that resolves when the request has completed
    return fetch(`./api/reviews/${review_id}/helpful`, {
      method: 'PUT'
    })
    .catch((err) => {
      console.error('Error marking review as helpful: ', err);
    });

  },

  reportReviewById(review_id) {
    // I: A review id number or string
    // O: A promise that resolves when the request has completed
    return fetch(`./api/reviews/${review_id}/report`, {
      method: 'PUT'
    })
    .catch((err) => {
      console.error('Error reporting review: ', err);
    });

  },

  //
  // QUESTIONS AND ANSWERS:
  //

  getQuestionsById(product_id, page = 1, count = 5) {
    // I: A product id number or string, optionally a page number and count per page
    // O: A promise that resolves to an array of question objects

    return fetch(`./api/qa/questions?product_id=${product_id}&page=${page}&count=${count}`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      if (!object.results) {
        throw new Error('Response from the server did not contain a results property');
      } else if (object.product_id != product_id ){
        throw new Error(`Server responded with questions for a different product.  Expected: ${product_id}, Received: ${object.product_id}`);
      } else {
        return object.results;
      }
    })
    .catch((err) => {
      console.error('Error retrieving questions from the server: ', err);
    });

  },

  getAnswersByQuestionId(question_id, page = 1, count = 5) {

    return fetch(`./api/qa/questions/${question_id}/answers?page=${page}&count=${count}`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      if (!object.results) {
        throw new Error('Response from the server did not contain a results property');
      } else if (object.question != question_id ){
        throw new Error(`Server responded with answers for a different question.  Expected: ${question_id}, Received: ${object.question}`);
      } else {
        return object.results;
      }
    })
    .catch((err) => {
      console.error('Error retrieving answers from the server: ', err);
    });

  },






}



export default helperFunctions;