import { List, Datagrid, TextField, EditButton } from "react-admin";

export const UsersList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="nameInOrganization" />
        <TextField source="name" />
        <TextField source="email" />
        <TextField source="role" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
