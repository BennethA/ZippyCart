import { FiHeadphones, FiRefreshCcw, FiShield, FiTruck } from "react-icons/fi";

const Services = ({ services }) => {
  const icons = [FiShoppingIcon, FiTruck, FiShield, FiRefreshCcw];

  function FiShoppingIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    );
  }

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-[24px] border border-gray-200 bg-white sm:grid-cols-2 lg:grid-cols-4 dark:border-white/10 dark:bg-[#151515]">
      {services.map((service, index) => {
        const Icon = icons[index] || FiHeadphones;

        return (
          <article
            key={service.id}
            className="group border-b border-gray-200 p-6 transition-colors duration-300 hover:bg-gray-50 sm:border-r sm:last:border-r-0 lg:border-b-0 lg:border-r dark:border-white/10 dark:hover:bg-white/[0.03]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2563eb]/10 text-[#2563eb] transition-transform duration-300 group-hover:scale-110">
                <Icon />
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {service.name}
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Services;
