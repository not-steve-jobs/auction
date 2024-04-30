// TODO modify places

interface IData {
  id?: string | any | never;
  name?: string;
}
export const modifyPlaces = (data: any[], places: any) => {
  const result: any = [];
  data.forEach((region) => {
    const regionData: { id: string; name: string; cities: IData[]; all_cities: boolean } = {
      id: region.id,
      name: region.name,
      cities: [],
      all_cities: false
    };
    region.cities?.forEach((city: IData) => {
      if (places.indexOf(city.id) > -1 || places[0] === "all") {
        regionData?.cities.push({ id: city.id, name: city.name });
      }
    });

    regionData.all_cities = region.cities.length === regionData.cities.length;

    if (regionData.cities.length) {
      result.push(regionData);
    } else if (places.indexOf(region.id) > -1) {
      regionData.all_cities = true;
      regionData.cities = [...region.cities].map((item) => {
        return { id: item.id, name: item.name };
      });
      result.push(regionData);
    }
  });

  return result;
};
