import { IConfig } from "@/views/components/utils/type";

const config: IConfig = {
  pageName: "role",
  item: [
    { model: "id", label: "id" },
    {
      model: "name",
      label: "name",
      rules: [],
    },
    { model: "test", label: "test" },
  ],
  tableSelection: true,
};

export default config;
