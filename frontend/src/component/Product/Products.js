import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const keyword = match.params.keyword;
  const setCurrentPageNo = e => setCurrentPage(e);
  const priceHandler = (event, newPrice) => setPrice(newPrice);
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;


/* // Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam semper metus vel risus pharetra, ac aliquet nisi
// ultricies. Nullam vel mauris sed purus efficitur facilisis eget ac orci. Vestibulum felis lacus, elementum a
// elit at, laoreet pulvinar quam. Aliquam iaculis tristique semper. Phasellus efficitur pharetra congue. Morbi
// malesuada est metus, eu maximus diam eleifend in. Integer sagittis sollicitudin sodales. Nam malesuada lectus
// nulla, vitae elementum diam finibus eu. Duis elit eros, rhoncus hendrerit elit in, convallis mollis elit.
// Suspendisse sodales ac nisl et tempor. Vivamus placerat dolor et quam accumsan, et porta eros consequat. Ut
// ultrices justo vitae turpis lacinia, vel feugiat ipsum rhoncus. Ut blandit nibh non consectetur euismod. Donec
// vestibulum at eros at tempus. Duis ligula tellus, luctus ac maximus pulvinar, interdum ut leo. Donec vitae odio
// pulvinar, blandit orci eget, posuere elit.

// Morbi eget auctor dui. Maecenas sed sollicitudin risus, eget fermentum urna. Nulla venenatis quis ligula vehicula
// venenatis. Vivamus id egestas dolor, vitae ullamcorper massa. Aenean ante leo, venenatis a turpis sed, vehicula
// volutpat felis. Aenean vitae consequat augue. Nunc at ex mi. Nunc venenatis elit est, ut condimentum metus placerat
// eget. Quisque facilisis urna orci, accumsan imperdiet orci vehicula sit amet. Nunc volutpat pellentesque lacinia.
// Aenean ornare diam quis imperdiet auctor. Proin faucibus enim id pretium efficitur. Integer elementum orci ut nulla
// facilisis pharetra.

// Nulla posuere tellus elementum urna placerat, ac pulvinar enim consectetur. Donec vitae varius augue. Donec at
// ipsum et eros facilisis ullamcorper. Aenean sed justo at enim porta porttitor quis eget dolor. Integer vitae enim
// non enim venenatis porttitor vel vitae risus. Morbi dui leo, lacinia ut sodales eget, aliquet in purus. Sed ex
// metus, efficitur nec elit sed, tristique aliquam lorem. Praesent eu justo ultrices, tristique quam quis, feugiat
// massa. Vestibulum eget orci venenatis, maximus leo nec, porttitor ipsum. Integer luctus tempus risus vel
// ullamcorper. Fusce tempus justo mauris, vel suscipit ipsum placerat nec. Praesent urna sapien, finibus non
// imperdiet dictum, sodales ut felis. Sed sit amet auctor odio. Aliquam tincidunt nulla condimentum sapien finibus,
// in sagittis tortor pharetra. Nam ullamcorper eu mi sit amet ultricies.

// Suspendisse non rutrum urna. Donec non turpis ipsum. Proin at efficitur urna, nec mattis magna. Etiam in lorem et
// justo tristique egestas. Nulla facilisi. Etiam a vestibulum ipsum. Curabitur sit amet commodo massa. Mauris
// interdum magna sem, id scelerisque odio euismod eu. Morbi vulputate, purus vel efficitur tincidunt, velit mi
// vehicula nibh, ut placerat nisi tortor ac diam. Donec lacinia sem sed ante auctor mollis. Fusce nec sapien iaculis,
// elementum nulla at, fermentum nisl. */
