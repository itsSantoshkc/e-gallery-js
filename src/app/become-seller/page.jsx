import React from "react";

const Page = () => {
  return (
    <div className="h-[95vh]  flex justify-center  ">
      <div className="flex flex-col items-center w-full my-10 border rounded-xl bg-stone-100 md:w-3/4 py-7 ">
        <div className="flex flex-col items-center justify-start  *:my-4 w-full md:w-3/4">
          <h1 className="text-5xl font-bold">Become a seller at E-gallery</h1>
          <p className="text-xl text-justify">
            To ensure the quality, safety, and integrity of our community, we
            have established specific requirements for users who wish to become
            sellers. Please review the following criteria carefully. You will
            need to submit certain documents and meet eligibility requirements
            to apply for an seller position.
          </p>
        </div>
        <div className="w-3/5 *:my-1 my-2">
          <h1 className="text-xl font-bold">1. Required Documentation:</h1>
          <ul className="list-disc list-inside">
            <li className="text-lg text-justify">
              <span className="font-semibold">Identification Proof: </span>A
              government-issued ID (e.g., passport, driver’s license, or
              national ID) to verify your identity.
            </li>
            <li className="text-lg text-justify">
              <span className="font-semibold">Proof of Residence:</span>A recent
              utility bill, bank statement, or similar document showing your
              current address, dated within the last three months.
            </li>
            <li className="text-lg text-justify">
              <span className="font-semibold">
                Business Registration Certificate:{" "}
              </span>
              A business registration certificatie that is issued by the
              government at the time of registering a business .
            </li>
          </ul>
        </div>

        <div className="w-3/5 *:my-1 my-2">
          <h1 className="text-xl font-bold">2. Application Process:</h1>
          <ul className="list-disc list-inside">
            <li className="text-lg text-justify">
              <span className="font-semibold">Document Submission: </span>Gather
              all required documents and submit them via email.
            </li>
            <li className="text-lg text-justify">
              <span className="font-semibold">Background Check: </span>A
              background check may be conducted for verification purposes.
            </li>
            <li className="text-lg text-justify">
              <span className="font-semibold">Approval : </span>A Qualified
              applicants will receive an email about their successfull
              application process within 7-14 business days after submission
            </li>
          </ul>
        </div>
        <div className="w-3/5 *:my-1 my-2">
          <h1 className="text-xl font-bold ">3. Privacy and Data Security:</h1>
          <ul>
            <li className="text-lg text-justify">
              All documents and personal information provided during this
              process will be securely stored and used only for verification
              purposes in compliance with our Privacy Policy.
            </li>
          </ul>
        </div>
        <div className="w-3/4 *:my-1 my-2 ">
          <h1 className="text-xl font-bold">Ready to Apply?</h1>
          <p className="text-lg text-justify">
            If you meet the above requirements and are committed to helping
            maintain a positive, safe, and engaging community, please proceed
            with your application and send the documents at{" "}
            <a
              href={`mailto:${process.env.SELLERCUSTOMERCARE}`}
              className="font-semibold text-blue-500 underline cursor-pointer"
            >
              seller-application@egallery.com
            </a>
            . We look forward to welcoming dedicated, reliable sellers to our
            platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
