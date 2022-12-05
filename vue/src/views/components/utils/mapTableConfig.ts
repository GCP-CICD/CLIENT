export default function (config: any) {
  const { item, tableSelection } = config;
  const tableItem: Array<any> = [];

  item.forEach((v: any) => {
    tableItem.push({
      ...v,
    });
  });

  return {
    tableItem,
    tableSelection,
  };
}
