import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
import { useStorage } from "../common/localStorage/StorageContext";

export const OrganizationContext = createContext<{
  organization: string | null;
  organizationRef: {
    current: string | null;
  };
  setOrganization: (key: string) => void;
}>({
  organization: null,
  organizationRef: { current: null },
  setOrganization: () => {},
});

export function useOrganization() {
  return useContext(OrganizationContext);
}

export const OrganizationProvider: FC<PropsWithChildren> = ({ children }) => {
  const storage = useStorage();
  const savedOrganization = storage.getItem("organization");
  const [organization, setOrganization] = useState(savedOrganization);
  const organizationRef = useRef(organization);

  return (
    <OrganizationContext.Provider
      value={{
        organization,
        organizationRef: organizationRef,
        setOrganization: (key: string) => {
          storage.setItem("organization", key);
          setOrganization(key);
          organizationRef.current = key;
        },
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
