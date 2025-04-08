import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsLetter";

const About = () => {
  return (
    <div>
      
      {/* Section Heading: About Us */}
      <div className="text-2xl text-center py-7 border-t  dark:text-gray-200 dark:border-y">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* Story and Mission Section */}
      <div className="mt-10 mb-20 flex flex-col md:flex-row gap-20  dark:text-gray-200">
        <img
          className="w-full md:max-w-[450px]  dark:text-gray-100"
          src={assets.about_us}
          alt=""
        />
        <div className="flex flex-col gap-6 md:w-2/4 text-gray-600">
        
          {/* Story paragraph */}
          <b className="text-gray-800 dark:text-gray-200">Our Story</b>
          <p className=" dark:text-gray-400">
            Like A Hummingbird Angry But Alive Love Me Well Burning Feathers
            Dust It Off
          </p>

          <p className="dark:text-gray-400">
            LUQMAN AJMAL Institute is a self- financial co-education institute
            dedicated to the training of medical and Vocational Training related
            courses.LUQMAN AJMAL Institute is a self- financial co-education
            institute dedicated to the training of medical and Vocational
            Training related courses.
          </p>

          {/* Mission paragraph */}
          <b className="text-gray-800  dark:text-gray-200">Our Mission</b>
          <p className=" dark:text-gray-400">
            Our A mission statement summarizes why a business exists and helps a
            company respond to change and make decisions that align with its
            visionA mission statement summarizes why a business exists and helps
            a company respond to change and make decisions that align with its
            visionA mission statement summarizes why a business exists and helps
            a company respond to change and make decisions that align with its
            vision
          </p>
        </div>
      </div>

      {/* Section Heading: Why Choose Us */}
      <div className=" text-2xl py-4 text-center">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      {/* Reasons to Choose Section */}
      <div className="flex flex-col md:flex-row text-sm mb-20  dark:bg-gray-700">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <img
            src={assets.quality_icon}
            className="w-12 m-auto mb-5 dark:invert"
            alt="Return Policy Icon"
          />
          
        {/* Quality Box */}
          <b>Quality Assurance:</b>
          <p className=" text-gray-600  dark:text-gray-300">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <img
            src={assets.quality_icon}
            className="w-12 m-auto mb-5 dark:invert"
            alt="Return Policy Icon"
          />
          
        {/* Convenience Box */}
          <b>Convenience:</b>
          <p className=" text-gray-600  dark:text-gray-300">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <img
            src={assets.quality_icon}
            className="w-12 m-auto mb-5 dark:invert"
            alt="Return Policy Icon"
          />
          
        {/* Customer Service Box */}
          <b>Exceptional Customer Service:</b>
          <p className=" text-gray-600  dark:text-gray-300">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterBox />
    </div>
  );
};

export default About;
