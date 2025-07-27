const Services = ({ services }) => {
  return (
    <section className="flex flex-wrap justify-center gap-6">
      {services.map((service) => (
        <article
          key={service.id}
          className="w-[250px] border-2 dark:border-gray-300 rounded-md p-4 hover:shadow dark:shadow-white transition"
        >
          <h3 className="font-semibold text-lg text-center">
            {service.name}
          </h3>
          <p className="text-gray-600 dark:text-[#c0c0c0] text-center">
            {service.description}
          </p>
        </article>
      ))}
    </section>
  );
};

export default Services;
