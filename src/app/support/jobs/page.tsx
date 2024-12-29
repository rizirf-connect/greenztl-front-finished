import React from "react";
import Heading from "@/components/atoms/heading";
import { FaChalkboardTeacher } from "react-icons/fa";

const Jobs = () => {
  return (
    <div className="px-[4vw] md:px-[10vw] py-10 bg-Gray200 dark:bg-Black100">
      <div className="flex justify-center items-center md:mb-10">
        <Heading
          text="Job Opportunities"
          className="text-3xl lg:text-5xl font-semibold py-4 md:py-10 text-Primary1000 dark:text-Primary50 dark:!bg-Black100"
        />
      </div>

      <div className="space-y-10">
        {/* Job Description */}
        <section className="p-4 md:p-8 rounded-lg shadow-lg mb-4 dark:bg-Black90">
          <div className="flex items-center space-x-4 mb-6">
            <FaChalkboardTeacher className="text-3xl text-Primary500" />
            <h2 className="md:text-2xl font-bold text-Primary1000 dark:text-Primary50">
              Paid Korean-to-English Translators (MTL Allowed)
            </h2>
          </div>
          <p className="text-sm md:text-lg mb-4">
            We are looking for skilled Korean-to-English translators to join our
            team. If you are passionate about translating and want to work with
            us, please review the requirements below.
          </p>

          <h3 className="text-lg md:text-xl font-semibold text-Primary1000 dark:text-Primary50 mb-4">
            Requirements:
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-lg">
            <li>
              - Able to use resources to understand Korean words/references
              (e.g., Google) and possess strong English writing skills.
            </li>
            <li>- Can deliver at least 3 chapters a week.</li>
            <li>- Can communicate regularly with a small team.</li>
            <li>- Adaptable, open to feedback, and willing to learn.</li>
          </ul>

          <h3 className="text-lg md:text-xl font-semibold text-Primary1000 dark:text-Primary50 mb-4">
            Compensation:
          </h3>
          <p className="text-sm md:text-lg mb-4">
            You will be paid a base of 90% of the revenue from advance chapters
            and 85% if you choose the assisted translating method. Further
            details are available on our Discord.
          </p>

          <h3 className="text-lg md:text-xl font-semibold text-Primary1000 dark:text-Primary50 mb-4">
            Quality and Consistency:
          </h3>
          <p className="text-sm md:text-lg mb-4">
            Your pay is determined by the quality of your work, consistency, and
            reader feedback. If significant issues in quality or consistency are
            noted, a percentage of your pay may be withheld until issues are
            resolved.
          </p>

          <p className="text-sm md:text-lg mb-4">
            To apply, please join our{" "}
            <a
              href="https://discord.gg/QAaKS8EBhj"
              className="text-Primary500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord
            </a>{" "}
            where you will be given a test to assess your suitability for the
            role.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Jobs;
