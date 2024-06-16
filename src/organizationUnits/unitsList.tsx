import {
  List,
  Datagrid,
  TextField,
  DeleteWithConfirmButton,
} from "react-admin";

export const UnitsList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="parent.name" />
        <>
          <DeleteWithConfirmButton />
        </>
      </Datagrid>
    </List>
  );
};
