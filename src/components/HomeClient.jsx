"use client";

import { useRevealer } from "@/hooks/useRevealer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(SplitText);

export default function HomeClient() {
  useRevealer();

  useGSAP(() => {
    const splitText = SplitText.create("h1", {
      type: "chars",
      charsClass: "letter",
      mask: "chars",
    });

    gsap.set(splitText.chars, { y: "110%" });

    gsap.to(splitText.chars, {
      y: "0%",
      duration: 1.5,
      stagger: 0.1,
      delay: 1.25,
      ease: "power4.out",
    });
  }, {});

  return (
    <>
      <div className="revealer"></div>
      <div className="home">
        <div className="header">
          <h1>nuvoro</h1>
        </div>

        <div className="hero-img">
          <div className="hero-img-inner" style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src="/hero.jpg"
              alt="Hero"
              fill
              priority
              sizes="(max-width: 900px) 90vw, 95vw"
            />
          </div>
        </div>
      </div>
    </>
  );
}