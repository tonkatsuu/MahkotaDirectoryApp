import { PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { collection, getCountFromServer, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function DashboardPieChart() {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const shopsCollection = await getDocs(collection(db, "shops"));
    if (shopsCollection.docs.length) {
      const shopsData = shopsCollection.docs.map((doc) => doc.data());

      const shopsWithTenant = shopsData.reduce((acc, curr) => {
        if (curr?.tenant_name) {
          return (acc += 1);
        }

        return acc;
      }, 0);

      setData([
        { value: shopsWithTenant, label: "Shops with tenant" },
        {
          value: shopsData.length - shopsWithTenant,
          label: "Shops without tenant",
        },
      ]);
    }
  }, []);

  if (!data) {
    return <div>Loading Data...</div>;
  }

  return (
    <div className="piechart">
      <p className="title">Occupancy Rate</p>
      <PieChart
        colors={["#ED7B7B", "#BDED7B"]}
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        width={800}
        height={400}
      />
    </div>
  );
}
