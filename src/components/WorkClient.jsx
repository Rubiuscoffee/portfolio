"use client";

import { useRevealer } from "@/hooks/useRevealer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ReactLenis from "lenis/react";
import Image from "next/image";

gsap.registerPlugin(SplitText);

export default function WorkClient() {
  useRevealer();

  useGSAP(() => {
    const splitText = SplitText.create("h1", {
      type: "words",
      wordsClass: "word",
      mask: "words",
    });

    gsap.set(splitText.words, { y: "110%" });

    gsap.to(splitText.words, {
      y: "0%",
      duration: 1.5,
      stagger: 0.25,
      delay: 1.75,
      ease: "power4.out",
    });
  }, {});

  return (
    <>
      <ReactLenis root>
        <div className="revealer"></div>
        <div className="work">
          <h1>selected work</h1>

          <div className="projects">
            <div className="project-img" style={{ position: "relative", width: "100%" }}>
              <Image src="/img1.jpg" alt="Project 1" fill sizes="(max-width: 900px) 90vw, 32vw" />
            </div>
            <div className="project-img" style={{ position: "relative", width: "100%" }}>
              <Image src="/img2.jpg" alt="Project 2" fill sizes="(max-width: 900px) 90vw, 32vw" />
            </div>
            <div className="project-img" style={{ position: "relative", width: "100%" }}>
              <Image src="/img3.jpg" alt="Project 3" fill sizes="(max-width: 900px) 90vw, 32vw" />
            </div>
            <div className="project-img" style={{ position: "relative", width: "100%" }}>
              <Image src="/img4.jpg" alt="Project 4" fill sizes="(max-width: 900px) 90vw, 32vw" />
            </div>
          </div>
        </div>
      </ReactLenis>
    </>
  );
}