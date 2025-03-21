import { about } from "../constants";


const AboutSection = () => {
  return (
    <div className="relative mt-10 border-b border-neutral-800 h-auto">
      <div className="text-center">
        <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          About
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-5 lg:mt-10 tracking-wide">
          Discover More About{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            Crypto Learning
          </span>
        </h2>
      </div>

      {/* <div className="flex flex-wrap mt-10 lg:mt-20"> */}
      <div className="flex flex-col items-start mt-5 lg:mt-10 w-full">

        {about.map((item, index) => (
        //   <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
        <div key={index} className="w-full max-w-none">

            <div className="flex">
              <div className="flex ml-2 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                {item.icon}
              </div>
              <div>
                <h5 className="mt-1 mb-6 text-xl">{item.text}</h5>
                {/* <p className="text-md p-2 mb-20 text-neutral-500"> */}
                <p className="text-md p-2 mb-6 text-neutral-500 w-full max-w-none break-words whitespace-normal text-justify">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
