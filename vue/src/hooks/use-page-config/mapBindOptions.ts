import mapPlaceholder from "./mapPlaceholder";
import mapType from "./mapType";

export default (item: any) => {
  const placeholder = mapPlaceholder(item);
  const type = mapType(item);

  switch (item.COLUMN_NAME) {
    case "status":
    case "role_id":
      return {
        placeholder: placeholder,
        // multiple: true,
        filterable: true,
        diabled: true,
      };
    case "created_at":
    case "updated_at":
    case "deleted_at":
      return {
        type: "daterange",
        ["unlink-panels"]: true,
        ["start-placeholder"]: "Start date",
        ["end-placeholder"]: "End date",
        ["range-separator"]: "To",
        shortcuts: [
          {
            text: "Last week",
            value: () => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            },
          },
          {
            text: "Last month",
            value: () => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            },
          },
          {
            text: "Last 3 months",
            value: () => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            },
          },
        ],
      };

    default:
      return {
        maxlength: item.CHARACTER_MAXIMUM_LENGTH,
        type: type, //native input types
        placeholder: placeholder,
      };
  }
};
