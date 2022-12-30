export default function (item: any) {
  switch (item.COLUMN_NAME) {
    case "created_at":
    case "updated_at":
    case "deleted_at":
      return "datepicker";

    case "status":
    case "role_id":
      return "select";

    case "password":
      return "password";

    default:
      return "input";
  }
}
