import type { IConfig } from "@/hooks/use-page-config/type";

const config: IConfig = {
  pageName: "role",
  itemList: {
    id: {},
    name: {},
    test: {},
    created_at: {},
    updated_at: {},
    deleted_at: {},
  },
  table: {
    selection: true,
    itemList: {
      id: {
        columnWidth: "100px",
        bindOptions: {
          sortable: true,
          filters: [
            { text: 1, value: 1 },
            { text: 2, value: 2 },
          ],
          ["filter-method"]: (value: string, row: any, column: any) => {
            const property = column["property"];
            return row[property] === value;
          },
        },
      },
      created_at: { bindOptions: { sortable: true } },
    },
    defaultSort: {
      prop: "created_at",
      order: "descending",
    },
  },
  createForm: { itemList: {} },
  editForm: {
    itemList: {},
  },
};

export default config;
