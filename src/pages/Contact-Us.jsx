import Title from "../components/Title";
import DataContext from "../Context/DataContext";
import { useContext } from "react";

export default function ContactUs() {
  const { socials } = useContext(DataContext);

  return (
    <div className="pt-[45px] gap-5 flex flex-col bg-center bg-cover mb-5 px-4 sm:px-[10vw]">
      <Title text1="CONTACT" text2="US" />
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col justify-center items-center gap-3 w-full sm:w-[45%] p-4 rounded-lg text-lg hover:shadow dark:shadow-white border-2">
          <div>
            <p className="font-bold">Our Store</p>
            <div className="text-gray-600 dark:text-[#c0c0c0]">
              <p>2542 William Street</p>
              <p>Pokuasi, Accra, Ghana</p>
            </div>
          </div>
          <div>
            <p className="font-bold">Reach Us</p>
            <div className="flex flex-col gap-2 items-start text-gray-600 dark:text-[#c0c0c0]">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex hover:opacity-80 items-center gap-2 hover:text-blue-700"
                >
                  {social.icon}
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[45%] sm:pt-0 pt-3 rounded-lg overflow-hidden">
          <iframe
            title="Our store location on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d127056.97423159608!2d-0.17694719999997358!3d5.636096000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgh!4v1713753274853!5m2!1sen!2sgh"
            loading="lazy"
            className="h-[300px] w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
