import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  const dashboard = () => history.push("/admin/dashboard");

  const orders = () => history.push("/orders");

  const account = () => history.push("/account");

  const cart = () => history.push("/cart");

  const logoutUser = () => {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;


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
