import { Admin, Resource } from "react-admin";
import { authProvider } from "./authProvider";
import { UnitCreate } from "./organizationUnits/unitCreate";
import { UnitsList } from "./organizationUnits/unitsList";
import { AppLayout } from "./common/layouts/AppLayout";
import { useDataProvider } from "./common/dataProviders";

export const App = () => {
  const dataProvider = useDataProvider();

  return (
    <Admin
      layout={AppLayout}
      dataProvider={dataProvider}
      authProvider={authProvider}
      requireAuth
    >
      <Resource name="units" list={UnitsList} create={UnitCreate} />
    </Admin>
  );
};
