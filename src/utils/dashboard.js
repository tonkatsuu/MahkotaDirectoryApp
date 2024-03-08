import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase";

export const WIDGETS_MAP = {
  shops: {
    title: "SHOPS",
    linkButton: {
      title: "See all shops",
      link: "/shops",
    },
    icon: (
      <PersonOutlinedIcon
        className="icon"
        style={{
          color: "crimson",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
        }}
      />
    ),
    calculateValue: async () => {
      const coll = collection(db, "shops");
      const snapshot = await getCountFromServer(coll);
      return snapshot.data().count;
    },
  },
  categories: {
    title: "CATEGORIES",
    linkButton: {
      title: "See all categories",
      link: "/category",
    },
    icon: (
      <ShoppingCartOutlinedIcon
        className="icon"
        style={{
          backgroundColor: "rgba(218, 165, 32, 0.2)",
          color: "goldenrod",
        }}
      />
    ),
    calculateValue: async () => {
      const coll = collection(db, "categories");
      const snapshot = await getCountFromServer(coll);
      return snapshot.data().count;
    },
  },
  amenities: {
    title: "AMENITIES",
    linkButton: {
      title: "See all amenities",
      link: "/amenity",
    },
    icon: (
      <MonetizationOnOutlinedIcon
        className="icon"
        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
      />
    ),
    calculateValue: async () => {
      const coll = collection(db, "amenities");
      const snapshot = await getCountFromServer(coll);
      return snapshot.data().count;
    },
  },
  events: {
    title: "EVENTS",
    linkButton: {
      title: "See all events",
      link: "/event",
    },
    icon: (
      <AccountBalanceWalletOutlinedIcon
        className="icon"
        style={{
          backgroundColor: "rgba(128, 0, 128, 0.2)",
          color: "purple",
        }}
      />
    ),
    calculateValue: async () => {
      const coll = collection(db, "events");
      const snapshot = await getCountFromServer(coll);
      return snapshot.data().count;
    },
  },
};
