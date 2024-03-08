import "./widget.scss";
import { WIDGETS_MAP } from "../../utils/dashboard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  const [value, setValue] = useState();

  const data = WIDGETS_MAP[type];

  useEffect(async () => {
    if (!data || typeof data.calculateValue !== "function") {
      return;
    }

    const valueFromDb = await data.calculateValue();
    setValue(valueFromDb);
  }, []);

  if (!data) {
    return <p>Widget data is not configured</p>;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{value}</span>

        <Link className="link" to={data.linkButton.link}>
          {data.linkButton.title}
        </Link>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
