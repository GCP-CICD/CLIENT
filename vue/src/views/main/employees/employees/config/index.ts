import { IConfig } from "@/views/components/utils/type";

const config: IConfig = {
  pageName: "employees",
  item: [
    { model: "status", label: "status", columnWidth: "100px" },
    { model: "picture", label: "picture", columnWidth: "100px" },
    { model: "last_name", label: "last_name" },
    { model: "first_name", label: "first_name" },
    { model: "email_address", label: "email_address" },
    { model: "created_at", label: "created_at" },
    { model: "updated_at", label: "updated_at" },
  ],
  tableSelection: true,
  searchFormLabelWidth: "100px",
};

export default config;
