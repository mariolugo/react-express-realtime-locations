import { MapPage, LocationsPage } from "../views/pages";

const routes = [
  {
    path: "/",
    name: "Map",
    component: MapPage,
    exact: true
  },
  {
    path: "/locations",
    name: "Locations",
    component: LocationsPage,
    exact: true
  }
];

export default routes;
