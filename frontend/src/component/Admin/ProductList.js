import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(state => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;


/* // Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam semper metus vel risus pharetra, ac aliquet nisi
// ultricies. Nullam vel mauris sed purus efficitur facilisis eget ac orci. Vestibulum felis lacus, elementum a
// elit at, laoreet pulvinar quam. Aliquam iaculis tristique semper. Phasellus efficitur pharetra congue. Morbi
// malesuada est metus, eu maximus diam eleifend in. Integer sagittis sollicitudin sodales. Nam malesuada lectus
// nulla, vitae elementum diam finibus eu. Duis elit eros, rhoncus hendrerit elit in, convallis mollis elit.
// Suspendisse sodales ac nisl et tempor. Vivamus placerat dolor et quam accumsan, et porta eros consequat. Ut
// ultrices justo vitae turpis lacinia, vel feugiat ipsum rhoncus. Ut blandit nibh non consectetur euismod. Donec
// vestibulum at eros at tempus. Duis ligula tellus, luctus ac maximus pulvinar, interdum ut leo. Donec vitae odio
// pulvinar, blandit orci eget, posuere elit.

// Suspendisse non sagittis erat, non varius lorem. Suspendisse potenti. Nam interdum neque eget ipsum molestie
// posuere. Morbi elementum ipsum elit, rutrum gravida nulla accumsan ac. Vestibulum non nulla luctus urna pharetra
// aliquet eu quis risus. Pellentesque facilisis maximus ipsum vitae blandit. Cras posuere consectetur arcu, vel
// cursus nulla suscipit ultricies. Integer bibendum, sem vel dapibus sollicitudin, purus nulla fermentum lectus, ut
// posuere mauris ex eget metus. Nam ac libero pellentesque, accumsan massa ut, hendrerit arcu. Vestibulum finibus
// arcu nec lacus hendrerit pellentesque sed id sapien.

// Morbi eget auctor dui. Maecenas sed sollicitudin risus, eget fermentum urna. Nulla venenatis quis ligula vehicula
// venenatis. Vivamus id egestas dolor, vitae ullamcorper massa. Aenean ante leo, venenatis a turpis sed, vehicula
// volutpat felis. Aenean vitae consequat augue. Nunc at ex mi. Nunc venenatis elit est, ut condimentum metus placerat
// eget. Quisque facilisis urna orci, accumsan imperdiet orci vehicula sit amet. Nunc volutpat pellentesque lacinia.
// Aenean ornare diam quis imperdiet auctor. Proin faucibus enim id pretium efficitur. Integer elementum orci ut nulla
// facilisis pharetra.

// Suspendisse non rutrum urna. Donec non turpis ipsum. Proin at efficitur urna, nec mattis magna. Etiam in lorem et
// justo tristique egestas. Nulla facilisi. Etiam a vestibulum ipsum. Curabitur sit amet commodo massa. Mauris
// interdum magna sem, id scelerisque odio euismod eu. Morbi vulputate, purus vel efficitur tincidunt, velit mi
// vehicula nibh, ut placerat nisi tortor ac diam. Donec lacinia sem sed ante auctor mollis. Fusce nec sapien iaculis,
// elementum nulla at, fermentum nisl. */
