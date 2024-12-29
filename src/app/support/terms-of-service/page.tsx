import React from "react";
import Heading from "@/components/atoms/heading";
import { Flex } from "antd";

const TermsOfService = () => {
  return (
    <div className="px-[4vw] md:px-[10vw] py-8 md:py-12 bg-Gray200 dark:bg-Primary900 text-white dark:text-Gray200">
      <Flex align="center" justify="center" className="mb-12">
        <Heading
          text="Terms of Service"
          className="text-3xl lg:text-5xl font-semibold text-Primary1000 dark:bg-Primary900 dark:text-Primary500"
        />
      </Flex>

      <div className="space-y-8">
        <section className="space-y-4 bg-white dark:bg-Primary700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-Primary1000">
            1. Acceptance of Terms
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            By accessing or using GreenzTL.com or any of our content, you (the
            ‘user’) agree to be bound by these Terms of Service. If you do not
            agree with any part of these Terms, please do not use the Website.
          </p>
        </section>

        <section className="space-y-4 bg-white dark:bg-Primary700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-Primary1000">
            2. Website Access
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            GreenzTL grants you a limited, non-exclusive, revocable license to
            access and use the Website for personal, non-commercial purposes,
            subject to these Terms. You agree:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-base md:text-lg">
            <li>
              - Not to use the Website for any unlawful purpose or in any manner
              that could damage, disable, overburden, or impair the Website,
              including but not limited to sharing distributed work without
              permission from the owner.
            </li>
            <li>
              - Not to attempt to gain unauthorized access to any portion of the
              Website or any systems or networks connected to the Website.
            </li>
            <li>
              - Not to interfere with any other party’s use and enjoyment of the
              Website.
            </li>
          </ul>
          <p className="text-base md:text-lg leading-relaxed">
            Certain features of the Website may require you to create an
            account. You are responsible for maintaining the confidentiality of
            your account information and for all activities that occur under
            your account.
          </p>
        </section>

        <section className="space-y-4 bg-white dark:bg-Primary700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-Primary1000">
            3. Intellectual Property Rights
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            All content on the Website, including text, graphics, logos, icons,
            images, audio clips, and software, is the property of GreenzTL or
            its licensors and is protected by copyright, trademark, and other
            intellectual property laws. You may access and use the content for
            personal, non-commercial purposes only. Any use beyond this requires
            written consent from GreenzTL.
          </p>
        </section>

        <section className="space-y-4 bg-white dark:bg-Primary700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-Primary1000">
            4. User Submissions
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            GreenzTL may allow you to submit content, such as novels or other
            materials (‘User Submissions’). You retain ownership of your User
            Submissions. By submitting User Submissions to the Website, you
            grant GreenzTL a worldwide, non-exclusive, royalty-free license to
            use, reproduce, distribute, and display the User Submissions in
            connection with the Website. You warrant that you have all necessary
            rights to grant this license and that your User Submissions comply
            with these Terms.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            You agree not to submit any User Submissions that:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-base md:text-lg">
            <li>
              - Infringe upon any third party’s intellectual property rights.
            </li>
            <li>
              - Are unlawful, defamatory, obscene, harassing, or otherwise
              objectionable.
            </li>
            <li>
              - Contain viruses, malware, Trojan horses, worms, or any other
              harmful code.
            </li>
          </ul>
          <p className="text-base md:text-lg leading-relaxed">
            GreenzTL reserves the right to remove any User Submissions and
            terminate your access to the Website for violating these Terms.
          </p>
        </section>

        <section className="space-y-4 bg-white dark:bg-Primary700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-Primary1000">
            5. Warranty Disclaimer
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            THE WEBSITE AND ITS CONTENT ARE PROVIDED ‘AS IS’ AND ‘AS AVAILABLE’
            WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. GREENZTL
            DISCLAIMS ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
        </section>

        <section className="space-y-4 bg-white dark:bg-Primary700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-Primary1000">
            6. Limitation of Liability
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            IN NO EVENT SHALL GREENZTL, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR
            AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO
            PERSONAL INJURY, PROPERTY DAMAGE, LOSS OF DATA, LOSS OF PROFITS, OR
            INTERRUPTION OF BUSINESS, ARISING OUT OF OR IN CONNECTION WITH THE
            USE OR INABILITY TO USE THE WEBSITE.
          </p>
        </section>

        <section className="space-y-4 bg-white dark:bg-Primary700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-Primary1000">
            7. Indemnification
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            You agree to indemnify and hold harmless GreenzTL, its affiliates,
            officers, directors, employees, and agents from any claims, damages,
            liabilities, and expenses (including attorneys’ fees) arising out of
            or related to YOUR USE OF THE WEBSITE.
          </p>
        </section>

        <section className="space-y-4 bg-white dark:bg-Primary700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-Primary1000">
            8. Age Requirements
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            You affirm that you are at least 18 years old, or an emancipated
            minor, or possess legal parental or guardian consent, and are fully
            able and competent to enter into these Terms. The Website is not
            intended for children under the age of 13.
          </p>
        </section>

        <section className="space-y-4 bg-white dark:bg-Primary700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-Primary1000">
            9. Governing Law and Dispute Resolution
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            These Terms shall be governed by and construed in accordance with
            the laws of [Your State/Country], without regard to its conflict of
            law principles.
          </p>
        </section>

        <section className="space-y-4 bg-white dark:bg-Primary700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-Primary1000">
            10. Changes to Terms
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            GreenzTL reserves the right to modify or replace these Terms at any
            time. Changes will be effective immediately upon posting to the
            Website.
          </p>
        </section>

        <section className="space-y-4 bg-white dark:bg-Primary700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-Primary1000">
            11. Miscellaneous
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            These Terms constitute the entire agreement between you and GreenzTL
            regarding your use of the Website. If any provision of these Terms
            is found to be invalid or unenforceable, the remaining provisions
            shall continue to be valid and enforceable.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
