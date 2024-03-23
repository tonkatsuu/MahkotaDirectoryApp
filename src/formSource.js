export const shopInputs = [
  {
    id: "logo_image",
    label: "Logo Image",
    type: "file",
    editable: true,
    visible: true,
  },
  {
    id: "shop_image",
    label: "Shop Image",
    type: "file",
    editable: true,
    visible: true,
  },
  {
    id: "tenant_name",
    label: "Tenant Name",
    type: "text",
    placeholder: "Insert Name",
    editable: true,
    visible: true,
  },
  {
    id: "level",
    label: "Level",
    type: "text",
    placeholder: "Insert Level",
    visible: true,
  },
  {
    id: "unit_no",
    label: "Unit No",
    type: "text",
    placeholder: "Insert Unit No",
    visible: true,
  },
  {
    id: "size",
    label: "Size",
    type: "text",
    placeholder: "Insert Size",
    visible: true,
  },
  {
    id: "entrance",
    label: "Entrance",
    type: "checkbox",
    editable: true,
    visible: true,
  },
  {
    id: "category",
    label: "Category",
    type: "reference",
    collectionName: "categories",
    labelKey: "category_name",
    editable: true,
    visible: true,
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
    editable: true,
    visible: true,
  },
];

export const categoryInputs = [
  {
    id: "category_name",
    label: "Name",
    type: "text",
    placeholder: "Insert Category",
    editable: true,
    visible: true,
  },
];

export const amenityInputs = [
  {
    id: "amenity_name",
    label: "Amenity Name",
    type: "text",
    placeholder: "Insert Name",
    editable: true,
    visible: true,
  },
  {
    id: "level",
    label: "Level",
    type: "text",
    placeholder: "Insert Level",
    visible: true,
  },
  {
    id: "unit_no",
    label: "Unit No",
    type: "text",
    placeholder: "Insert Unit No",
    visible: true,
  },
  {
    id: "size",
    label: "Size",
    type: "text",
    placeholder: "Insert Size",
    visible: true,
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
    editable: true,
    visible: true,
  },
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Insert Event/Promotion",
    editable: true,
    visible: true,
  },
  {
    id: "start_date",
    label: "Start Date",
    type: "date",
    editable: true,
    visible: true,
  },
  {
    id: "end_date",
    label: "End Date",
    type: "date",
    editable: true,
    visible: true,
  },
  {
    id: "media",
    label: "Media",
    type: "file",
    editable: true,
    visible: true,
  },
];
