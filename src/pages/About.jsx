import Title from "../components/Title";

const About = () => {
  const whyUs = [
    {
      title: "Why Choose Us",
      text: "Fast shipping, secure checkout, and a wide selection — we care about making your shopping experience stress-free.",
    },
    {
      title: "Our Mission",
      text: "We bring together style, quality, and affordability, so you always get the best value.",
    },
    {
      title: "Our Promise",
      text: "Your satisfaction is our priority. Easy returns, reliable support, and a friendly team ready to help.",
    },
  ];
  return (
    <main className="pt-[45px] flex flex-col gap-6 items-center mb-5">
      <Title text1="ABOUT" text2="US" />
      <p className="font-medium dark:text-[#c0c0c0] max-w-3xl mx-auto text-center">
        At ZippyCart, we’re on a mission to make online shopping simple, fun,
        and convenient. Whether you’re looking for the latest fashion or
        timeless accessories, you’ll find it here — with secure payments and
        fast delivery.
      </p>
      <div className="flex flex-wrap justify-center gap-5 mt-5">
        {whyUs.map((item, index) => (
          <div
            key={index}
            className="w-[300px] rounded-md p-4 shadow-md dark:shadow-white"
          >
            <h2 className="mb-2 font-bold">{item.title}</h2>
            <p className="text-sm text-gray-600 dark:text-[#c0c0c0]">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default About;
