export const shopInputs = [
  {
    id: "logo_image",
    label: "Logo Image",
    type: "file",
  },
  {
    id: "shop_image",
    label: "Shop Image",
    type: "file",
  },
  {
    id: "tenant_name",
    label: "Tenant Name",
    type: "text",
    placeholder: "Insert Name",
  },
  {
    id: "level",
    label: "Level",
    type: "text",
    placeholder: "Insert Level",
  },
  {
    id: "unit_no",
    label: "Unit No",
    type: "text",
    placeholder: "Insert Unit No",
  },
  {
    id: "size",
    label: "Size",
    type: "text",
    placeholder: "Insert Size",
  },
  {
    id: "entrance",
    label: "Entrance",
    type: "checkbox",
  },
  {
    id: "category",
    label: "Category",
    type: "reference",
    collectionName: "categories",
    labelKey: "category_name",
  },
  {
    id: "x_coordinate",
    label: "X-Coordinate",
    type: "text",
    placeholder: "Insert X-Coordinate",
  },
  {
    id: "y_coordinate",
    label: "Y-Coordinate",
    type: "text",
    placeholder: "Insert Y-Coordinate",
  },
  {
    id: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Insert Description",
  },
];

export const categoryInputs = [
  {
    id: "category_name",
    label: "Name",
    type: "text",
    placeholder: "Insert Category",
  },
];

export const amenityInputs = [
  {
    id: "amenity_name",
    label: "Amenity Name",
    type: "text",
    placeholder: "Insert Name",
  },
  {
    id: "level",
    label: "Level",
    type: "text",
    placeholder: "Insert Level",
  },
  {
    id: "unit_no",
    label: "Unit No",
    type: "text",
    placeholder: "Insert Unit No",
  },
  {
    id: "size",
    label: "Size",
    type: "text",
    placeholder: "Insert Size",
  },
  {
    id: "x_coordinate",
    label: "X-Coordinate",
    type: "text",
    placeholder: "Insert X-Coordinate",
  },
  {
    id: "y_coordinate",
    label: "Y-Coordinate",
    type: "text",
    placeholder: "Insert Y-Coordinate",
  },
];

export const eventInputs = [
  {
    id: "event_or_promotion",
    label: "Event/Promotion",
    type: "select",
    options: [
      { value: "Event", label: "Event" },
      { value: "Promotion", label: "Promotion" },
    ],
  },
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Insert Event/Promotion",
  },
  {
    id: "start_date",
    label: "Start Date",
    type: "date",
  },
  {
    id: "end_date",
    label: "End Date",
    type: "date",
  },
  {
    id: "media",
    label: "Media",
    type: "file",
  },
];
