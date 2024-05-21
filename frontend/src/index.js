import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);


/* // 

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
