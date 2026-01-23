import React, { useEffect } from 'react';
import ImageCard from '../components/ImageCard';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productAction';
import Masonry from 'react-masonry-css';

const HomeScreen = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const author = searchParams.get('author');
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.listProducts);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((product) => product.author === author);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <h1 className='py-4'>
    <i className='fas fa-camera-retro'></i>PHoToStreaM
  </h1>
  <a className='btn my-3 align' href='/'>
    <i className='fas fa-arrow-left'></i>Back
  </a>
</div>
{!loading && filteredProducts.length === 0 ? (
  <div className='justify-content-center'>No Products yet..<i className='fas fa-face-sad-tear'></i></div>
) : (
  <Masonry
    breakpointCols={breakpointColumnsObj}
    className='my-masonry-grid'
    columnClassName='my-masonry-grid_column'
  >
    {filteredProducts.map((product) => (
      <div key={product._id} className='my-masonry-grid_item'>
        <ImageCard product={product} />
      </div>
    ))}
  </Masonry>
)}
    </div>
  );
};

export default HomeScreen;
