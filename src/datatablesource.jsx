import IOSSwitch from "./components/input/CheckBox";
import ReferencePreview from "./components/reference-preview/ReferencePreview";

export const shopColumns = [
  {
    field: "logo_image",
    headerName: "Logo Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.value} height="80" width="80" />;
    },
  },
  {
    field: "tenant_name",
    headerName: "Tenant Name",
    width: 230,
  },
  {
    field: "level",
    headerName: "Level",
    width: 150,
  },
  {
    field: "unit_no",
    headerName: "Unit No",
    width: 150,
  },
  {
    field: "entrance",
    headerName: "Entrance",
    width: 150,
    renderCell: (params) => {
      return <IOSSwitch checked={params.value} />;
    },
  },
  {
    field: "size",
    headerName: "Size",
    width: 150,
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    renderCell: (params) => (
      <ReferencePreview
        id={params.value}
        collectionName="categories"
        labelKey="category_name"
      />
    ),
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "shop_image",
    headerName: "Shop Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.value} height="80" width="80" />;
    },
  },
];
export const categoryColumns = [
  {
    field: "category_name",
    headerName: "Name",
    width: 200,
  },
];
export const amenityColumns = [
  {
    field: "amenity_name",
    headerName: "Amenity Name",
    width: 230,
  },
  {
    field: "level",
    headerName: "Level",
    width: 150,
  },
  {
    field: "unit_no",
    headerName: "Unit No",
    width: 150,
  },
  {
    field: "size",
    headerName: "Size",
    width: 150,
  },
];
export const eventColumns = [
  {
    field: "event_or_promotion",
    headerName: "Event/Promotion",
    width: 150,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "media",
    headerName: "Media",
    width: 100,

    renderCell: (params) => {
      return <img src={params.value} height="80" width="80" />;
    },
  },
  {
    field: "start_date",
    headerName: "Start Date",
    width: 200,
  },
  {
    field: "end_date",
    headerName: "End Date",
    width: 200,
  },
];
