import React from "react";

const FAQs = () => {
  return (
    <div className="px-[4vw] md:px-[10vw] py-10 bg-Gray200 dark:bg-Black100">
      <div className="flex justify-center items-center md:mb-10">
        <h1 className="text-3xl lg:text-5xl font-semibold py-4 md:py-10 text-Primary1000 dark:text-Primary50">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="space-y-10">
        {/* FAQ Item 1 */}
        <section className="bg-white dark:bg-Black90 p-3 md:p-6 rounded-lg shadow-lg mb-2 md:mb-6">
          <h2 className="text-xl font-bold text-Primary1000 dark:text-Primary50">
            How do I obtain the currency?
          </h2>
          <p className="mt-2">
            You can obtain the currency through various methods, including
            purchasing it directly from our website or participating in special
            promotions. For more details, please visit our Discord server.
          </p>
        </section>

        {/* FAQ Item 2 */}
        <section className="bg-white dark:bg-Black90 p-3 md:p-6 rounded-lg shadow-lg mb-2 md:mb-6">
          <h2 className="text-xl font-bold text-Primary1000 dark:text-Primary50">
            Can I get the currency for free?
          </h2>
          <p className="mt-2">
            Yes, there are opportunities to earn free currency through specific
            events and promotions. For more information on how to participate,
            please check our Discord server.
          </p>
        </section>

        {/* FAQ Item 3 */}
        <section className="bg-white dark:bg-Black90 p-3 md:p-6 rounded-lg shadow-lg mb-2 md:mb-6">
          <h2 className="text-xl font-bold text-Primary1000 dark:text-Primary50">
            How do I use the currency?
          </h2>
          <p className="mt-2">
            The currency can be used to purchase various items and services on
            our platform. Detailed instructions on how to use it can be found in
            the user guide available on our website.
          </p>
        </section>

        {/* FAQ Item 4 */}
        <section className="bg-white dark:bg-Black90 p-3 md:p-6 rounded-lg shadow-lg mb-2 md:mb-6">
          <h2 className="text-xl font-bold text-Primary1000 dark:text-Primary50">
            How do I recommend a series for translation?
          </h2>
          <p className="mt-2">
            To recommend a series for translation, please visit our Discord
            server. We handle recommendations and feedback through our community
            there.
          </p>
        </section>
      </div>

      <div className="flex justify-center mt-10">
        <a
          target="_blank"
          href="https://discord.gg/QAaKS8EBhj"
          className="bg-Primary500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-Primary600 transition-colors"
        >
          Join Our Discord
        </a>
      </div>
    </div>
  );
};

export default FAQs;
