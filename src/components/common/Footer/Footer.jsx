"use client";
import React, { useState } from "react";
import FooterItemLink from "./FooterItemLink";
import { accountItems, blankItems, shopItems } from "@/structures/Footer";
import Image from "next/image";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };

  return (
    <div className="w-full bg-[#F5F5F3] py-20 mt-20">
      <div className="container grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-4 gap-10">
        <div className="col-span-2">
          <h3 className="text-xl font-bodyFont font-semibold mb-6">
            More about Orebi Shop
          </h3>

          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sint
              ab ullam, numquam nesciunt in.
            </p>
            <ul className="flex items-center gap-2">
              {blankItems.map((v, i) => (
                <FooterItemLink key={i} href={v.href} icon={v.icon} target />
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bodyFont font-semibold mb-6">Shop</h3>
          <ul className="flex flex-col gap-2">
            {shopItems.map((v, i) => (
              <FooterItemLink key={i} href={v} />
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bodyFont font-semibold mb-6">
            Your account
          </h3>

          <ul className="flex flex-col gap-2">
            {accountItems.map((v, i) => (
              <FooterItemLink key={i} href={v} />
            ))}
          </ul>
        </div>
        <div className="col-span-2 flex flex-col items-center w-full px-4">
          <h3 className="text-xl font-bodyFont font-semibold mb-6">
            Subscribe to our newsletter.
          </h3>
          <div className="w-full">
            <p className="text-center mb-4">
              A at pellentesque et mattis porta enim elementum.
            </p>
            {subscription ? (
              <p className="w-full text-center text-base font-semibold text-green-600">
                Subscribed Successfully !
              </p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primary text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder="Insert your email ...*"
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-white text-lightText w-[30%] h-10 hover:bg-black hover:text-white duration-300 text-base tracking-wide"
                >
                  Subscribe
                </button>
              </div>
            )}

            <Image
              className={`w-[80%] lg:w-[60%] mx-auto ${
                subscription ? "mt-2" : "mt-6"
              }`}
              src={"/images/payment.png"}
              width={215}
              height={64}
              alt="payment method supported"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
