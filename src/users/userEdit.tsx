import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  SelectInput,
} from "react-admin";

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="nameInOrganization" validate={required()} />
      <SelectInput
        source="role"
        choices={[
          { id: "teacher", name: "Teacher" },
          { id: "Administrator", name: "Administrator" },
        ]}
        validate={required()}
      />
      <TextInput source="name" disabled />
      <TextInput source="email" disabled />
      <TextInput source="outerId" disabled />
    </SimpleForm>
  </Edit>
);
