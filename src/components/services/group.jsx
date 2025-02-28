import { useRef } from "react";
import classNames from "classnames";
import { Disclosure, Transition } from "@headlessui/react";

import List from "components/services/list";
import ResolvedIcon from "components/resolvedicon";

export default function ServicesGroup({ group, services, layout, fiveColumns, disableCollapse }) {
  const panel = useRef();

  return (
    <div
      key={services.name}
      className={classNames(
        "services-group",
        layout?.style === "row" ? "w-2/3" : "w-2/3 md:basis-1/2 lg:basis-1/3 xl:basis-1/4",
        layout?.style !== "row" && fiveColumns ? "3xl:basis-1/5" : "",
        layout?.header === false ? "flex-1 px-1 -my-1" : "flex-1 p-1",
      )}
    >
      <Disclosure defaultOpen>
        {() => (
          <>
            {layout?.header !== false && (
              <Disclosure.Button disabled={disableCollapse} className="flex w-full select-none items-center justify-center group">
                {layout?.icon && (
                  <div className="flex-shrink-0 mr-2 w-7 h-7 service-group-icon">
                    <ResolvedIcon icon={layout.icon} />
                  </div>
                )}
                <h2 className="flex text-theme-800 dark:text-theme-300 text-xl font-medium service-group-name">
                  {services.name}
                </h2>
              </Disclosure.Button>
            )}
            <Transition
              // Otherwise the transition group does display: none and cancels animation
              className="!block"
              unmount={false}
              beforeLeave={() => {
                panel.current.style.height = `${panel.current.scrollHeight}px`;
                setTimeout(() => {
                  panel.current.style.height = `0`;
                }, 1);
              }}
              beforeEnter={() => {
                panel.current.style.height = `0px`;
                setTimeout(() => {
                  panel.current.style.height = `${panel.current.scrollHeight}px`;
                }, 1);
                setTimeout(() => {
                  panel.current.style.height = "auto";
                }, 150); // animation is 150ms
              }}
            >
              <Disclosure.Panel className="transition-all overflow-hidden duration-300 ease-out" ref={panel} static>
                <List group={group} services={services.services} layout={layout} />
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
