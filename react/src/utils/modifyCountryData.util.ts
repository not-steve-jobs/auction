export const transformDataForAntdSelectTree = (data: any[]) => {
  return [
    {
      value: "all",
      title: "All",
      children: data.map((country) => ({
        title: country.name,
        value: `r_${country.id}`,
        children: country.cities.map((city: { name: string; id: string }) => ({
          title: city.name,
          value: `c_${city.id}`
        }))
      }))
    }
  ];
};
