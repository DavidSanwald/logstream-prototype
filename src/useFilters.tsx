type Update_Filter = {
  type: "update_filter";
  payload: { filterValue: any[]; filterKey: string };
};
type Action = Update_Filter;

const applyFilters = (item, filters) =>
  Object.entries(filters).reduce((acc, curr) => {
    const [key, value] = curr;
    return acc && Array.isArray(value)
      ? value.length === 0
        ? true
        : value.includes(item[key])
      : value === item[key];
  }, true);

export { applyFilters };
