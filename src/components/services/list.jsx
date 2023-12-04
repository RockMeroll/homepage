import classNames from "classnames";

import Item from "components/services/item";

export default function List({ group, services, layout }) {
  return (
    <ul
      className={classNames(
        "flex gap-4 justify-center flex-wrap",
        "mt-3 services-list",
      )}
    >
      {services.map((service) => (
        <Item key={service.container ?? service.app ?? service.name} service={service} group={group} />
      ))}
    </ul>
  );
}
