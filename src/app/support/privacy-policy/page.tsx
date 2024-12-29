import React from "react";
import Heading from "@/components/atoms/heading";

const PrivacyPolicy = () => {
  return (
    <div className="px-[4vw] md:px-[10vw] py-8 md:py-12 bg-Gray200 dark:bg-Primary900 text-white dark:text-Gray200">
      <div className="flex justify-center items-center mb-12">
        <Heading
          text="Privacy Policy"
          className="text-3xl lg:text-5xl font-semibold text-Primary1000 dark:bg-Primary900 dark:text-Primary500"
        />
      </div>

      <div className="space-y-8">
        <section className="space-y-4 ">
          <p className="text-base md:text-lg leading-relaxed">
            By using our site, a user agrees to the following: Similar to most
            web servers, GreenzTL uses log files and cookies to enhance the user
            experience.
          </p>
        </section>

        <section className="space-y-4 bg-white dark:bg-Primary700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-Primary1000">
            1. Data Collected
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            The types of data collected include:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-base md:text-lg">
            <li>- Internet Protocol (IP) addresses</li>
            <li>- Internet Service Provider (ISP)</li>
            <li>- Date and time stamps</li>
            <li>- Number of clicks</li>
            <li>- Browser type</li>
            <li>- Platform type</li>
            <li>- Referring/exit pages</li>
          </ul>
          <p className="text-base md:text-lg leading-relaxed">
            This data allows us to analyze trends of user behavior broadly to
            better administer the site. None of this data is linked to
            personally identifiable information.
          </p>
        </section>

        <section className="space-y-4 bg-white dark:bg-Primary700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-Primary1000">
            2. External Links
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            Users may come across links that bring them to external websites.
            Our Privacy Policy does not extend to these sites, and we encourage
            users to be aware of the privacy statements of those respective
            sites.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
