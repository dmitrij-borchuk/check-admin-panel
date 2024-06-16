import {
  AutocompleteInput,
  Create,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const UnitCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" required />
      <ReferenceInput source="parentId" reference="units" page={1} perPage={25}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
