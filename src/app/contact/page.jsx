"use client";
import { useRevealer } from "@/hooks/useRevealer";
import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ReactLenis from "lenis/react";

gsap.registerPlugin(SplitText);

const Contact = () => {
  useRevealer();

  useGSAP(() => {
    const splitText = SplitText.create("h2", {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });

    gsap.set(splitText.lines, { y: "110%" });

    gsap.to(splitText.lines, {
      y: "0%",
      duration: 1.5,
      stagger: 0.1,
      delay: 1.75,
      ease: "power4.out",
    });
  }, {});

  return (
    <>
      <ReactLenis root>
        <div className="revealer"></div>
        <div className="contact">
          <div className="col">
            <h2>Contacto</h2>
          </div>
          <div className="col">
            <div className="contact-copy">
              <h2>Colaboraciones</h2>
              <h2>brian@rubiuscoffee.dev</h2>
            </div>

            <div className="contact-copy">
              <h2>Consultas</h2>
              <h2>hello@rubiuscoffee.dev</h2>
            </div>

            <div className="socials">
              <p><a href="https://github.com/Rubiuscoffee" target="_blank" rel="noopener noreferrer">GitHub</a></p>
              <p><a href="https://twitter.com/1946cc" target="_blank" rel="noopener noreferrer">Twitter</a></p>
              <p><a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
            </div>
          </div>
        </div>
      </ReactLenis>
    </>
  );
};

export default Contact;
