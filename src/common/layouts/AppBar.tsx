import { FC, PropsWithChildren } from "react";
import {
  AppBar,
  TitlePortal,
  useInfiniteGetList,
  useRefresh,
} from "react-admin";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useOrganization } from "../../organizations/organizationContext";

export const AdminAppBar: FC<PropsWithChildren> = ({ children }) => (
  <AppBar>
    <TitlePortal />
    {children}
    <OrganizationSelector />
  </AppBar>
);

const OrganizationSelector = () => {
  const { organization, setOrganization } = useOrganization();
  const refresh = useRefresh();
  const { data } = useInfiniteGetList<Organization>(
    "organizations",
    {
      pagination: { page: 1, perPage: 10 },
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const allItems = data.pages.flatMap((page) => {
          return page.data;
        });
        const initial = allItems.find((item) => item.key === organization);
        if (!initial && allItems.length > 0) {
          updateValue(allItems[0].key);
        }
      },
    }
  );
  const updateValue = (key: string) => {
    setOrganization(key);
    refresh();
  };

  return (
    <Select
      labelId="organization-select-label"
      id="organization-select"
      value={organization || ""}
      label="Organization"
      variant="standard"
      disableUnderline
      sx={{
        color: "white",
      }}
      onChange={(e) => {
        updateValue(e.target.value);
      }}
    >
      {data?.pages.map((page) =>
        page.data.map((d) => (
          <MenuItem key={d.key} value={d.key}>
            {d.name}
          </MenuItem>
        ))
      )}
    </Select>
  );
};

type Organization = {
  id: number;
  name: string;
  key: string;
};
