import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { UnitCreate } from "./organizationUnits/unitCreate";
import { UnitsList } from "./organizationUnits/unitsList";

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth>
    <Resource name="units" list={UnitsList} create={UnitCreate} />
  </Admin>
);
