import React from "react";
import Heading from "@/components/atoms/heading";

const AboutUs = () => {
  return (
    <div className="px-[4vw] md:px-[10vw] py-4 md:py-12 bg-Gray200 dark:bg-Black100">
      <div className="flex justify-center items-center mb-10">
        <Heading
          text="About Us"
          className="text-3xl lg:text-5xl font-semibold py-4 md:py-10 text-Primary1000 dark:text-Primary50 dark:!bg-Black100"
        />
      </div>

      <section className="bg-white dark:bg-Black90 p-8 rounded-lg shadow-lg">
        <p className="text-sm md:text-lg leading-relaxed text-Primary1000 dark:text-Primary50">
          GreenzTL.com is a collective of translators focused on consistent
          quality and release to bring Asian novels to readers. We are ad-free
          and aim to stay that way, so your support is greatly appreciated :)
        </p>
        <p className="mt-4 text-sm md:text-lg leading-relaxed text-Primary1000 dark:text-Primary50">
          Our team is dedicated to delivering timely and accurate translations,
          ensuring that fans from all over the world can enjoy the best of Asian
          literature. With a passion for storytelling, we strive to make every
          chapter release as seamless and enjoyable as possible.
        </p>
        <p className="mt-4 text-sm md:text-lg leading-relaxed text-Primary1000 dark:text-Primary50">
          Thank you for being part of our community, and we look forward to
          continuing this journey together with your invaluable support.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
