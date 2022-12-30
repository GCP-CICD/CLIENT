import type { IConfig } from "@/hooks/use-page-config/type";

const config: IConfig = {
  pageName: "employees",
  itemList: {
    id: {},
    status: {},
    email_address: {},
    password: {},
    picture: {},
    first_name: {},
    last_name: {},
    role_id: {},
    created_at: {},
    updated_at: {},
    address: {},
    business_phone: {},
    city: {},
    company: {},
    country_region: {},
    fax_number: {},
    home_phone: {},
    job_title: {},
    mobile_phone: {},
    state_province: {},
    zip_postal_code: {},
  },
  table: {
    selection: true,
    itemList: {
      id: { columnWidth: "50px" },
      status: { model: "status", label: "狀態", columnWidth: "100px" },
      picture: { columnWidth: "100px" },
      last_name: { model: "last_name", label: "last_name", columnWidth: "100px" },
      created_at: { model: "created_at", label: "created_at", columnWidth: "100px" },
      password: { isHide: true },
    },
  },
  searchForm: {
    formLabelWidth: "150px",
    itemList: {
      picture: { isHide: true },
      password: { isHide: true },
    },
  },
  createForm: { itemList: {} },
  editForm: {
    itemList: {
      password: {
        bindOptions: {
          disabled: true,
        },
      },
    },
  },
};

export default config;
