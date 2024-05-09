import { useState, useEffect } from "react";
import { feature } from "topojson-client";
import { json } from "d3";

const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    json(jsonUrl).then((topojsonData) => {
      const { countries, _ } = topojsonData.objects;
      setData({ countries: feature(topojsonData, countries) });
    });
  }, []);
  return data;
};
