import React from "react";
import Heading from "@/components/atoms/heading";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Button from "@/components/atoms/button";

const ContactUs = () => {
  return (
    <div className="px-[4vw] md:px-[10vw] py-4 md:py-10 bg-Gray200 dark:bg-Black100">
      <div className="flex justify-center items-center mb-4 md:mb-10">
        <Heading
          text="Contact Us"
          className="text-3xl lg:text-5xl font-semibold py-4 md:py-10 text-Primary1000 dark:text-Primary50 dark:!bg-Black100"
        />
      </div>

      <div className="space-y-10">
        <section className="bg-white dark:bg-Black90 p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-Primary1000 dark:text-Primary50">
            Get in Touch
          </h2>
          <p className="text-sm md:text-lg">
            We’re here to help! For all general inquiries, please look through
            the FAQ section first. If you need further assistance, feel free to
            contact us using the details below.
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-2xl text-Primary500" />
              <div>
                <h3 className="font-semibold text-sm md:text-lg text-Primary1000 dark:text-Primary50">
                  Email Us
                </h3>
                <p className="text-xs md:text-md">greenztlnovels@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-2xl text-Primary500" />
              <div>
                <h3 className="font-semibold text-sm md:text-lg text-Primary1000 dark:text-Primary50">
                  Call Us
                </h3>
                <p className="text-xs md:text-md">+1 (123) 456-7890</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-2xl text-Primary500" />
              <div>
                <h3 className="font-semibold text-sm md:text-lg text-Primary1000 dark:text-Primary50">
                  Visit Us
                </h3>
                <p className="text-xs md:text-md">
                  123 Main Street, City, Country
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <a href="mailto:greenztlnovels@gmail.com" className="inline-block">
              <Button
                text="Send Us a Message"
                type="primary"
                size="large"
                className="text-white hover:bg-Primary600"
                style={{ background: "var(--color-primary-500)" }}
              />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
