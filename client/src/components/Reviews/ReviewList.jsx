import React, {useRef, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import ReviewListElement from './ReviewListElement.jsx';

function ReviewList(props) {

  const [sortedReviews, sortReviews] = useState([]);
  const [sortSetting, setSort] = useState('Relevant');
  const productIdRef = useRef(props.currentProduct)
  useEffect(() => {
    sortReviews(props.reviewsArr);
    // Change the dropdown to show recommended
  }, [props.reviewsArr])

  //inefficent, reconfigure for optimization.
  useEffect(() => {
    sortReviews(sortedReviews)
  }, [sortedReviews])

  useEffect(() => {
    if (!productIdRef.current) {
      setSort('Relevant')
    }
  })

  const handleSort = (e) => {
    setSort(e.target.value);
    console.log('i exist!: ', sortSetting);
    handleOrder(e.target.value);
  }

  const handleOrder = (sortBy) => {
    console.log('i also exist!: ', sortBy)
    if (sortBy === 'Newest') {
      let newest = props.reviewsArr.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      console.log(newest);
      sortReviews(newest);
    }
    if (sortBy === 'Helpful') {
      let helpful = props.reviewsArr.slice().sort((a, b) => b.helpfulness - a.helpfulness)
      console.log(helpful);
      sortReviews(helpful);
    }
    if (sortBy === 'Relevant') {
      let newest = props.reviewsArr.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      let relevance = newest.slice().sort((a, b) => b.helpfulness - a.helpfulness)
      sortReviews(relevance);
    }

  }

  return (
    <div className="reviewList">
      <div className="reviewListHeader">
        <h1>Reviews</h1>
          <select className="reviewListSortButton" value={sortSetting} onChange={handleSort}>
            <option value="Relevant">Most Relevant</option>
            <option value="Helpful">Helpful</option>
            <option value="Newest">Newest</option>
          </select>
      </div>
      {sortedReviews.map((review, index) => {return <ReviewListElement review={review} key={review.review_id} index={index}/>}
      ).slice(0, props.reviewCount)}
    </div>
  )
}

export default ReviewList;