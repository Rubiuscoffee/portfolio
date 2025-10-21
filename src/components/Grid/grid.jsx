"use client";
import "./grid.css";
import { useEffect, useRef } from "react";
import { LogoIcon } from "./LogoIcon";

export default function Home() {
  const containerRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const highlight = highlightRef.current;
    const gridItems = container.querySelectorAll(".grid-item");
    const firstItem = container.querySelector(".grid-item");

    const highlightColors = [
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
    ];

    gridItems.forEach((item, index) => {
      item.dataset.color = highlightColors[index % highlightColors.length];
    });

    // Sincronizar clase activa con el fin de la transición del highlight
    let pendingElement = null;
    let currentActiveElement = null;

    const applyActive = (element) => {
      if (currentActiveElement) currentActiveElement.classList.remove('is-active');
      if (element) {
        element.classList.add('is-active');
        currentActiveElement = element;
      } else {
        currentActiveElement = null;
      }
    };

    const handleTransitionEnd = (e) => {
      if (e.propertyName !== 'transform') return;
      if (pendingElement) {
        applyActive(pendingElement);
        pendingElement = null;
      }
    };

    highlight.addEventListener('transitionend', handleTransitionEnd);

    const moveToElement = (element) => {
      if (element) {
        // Esperar a que el highlight termine su movimiento para activar colores
        pendingElement = element;

        const rect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        highlight.style.transform = `translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px)`;
        highlight.style.width = `${rect.width}px`;
        highlight.style.height = `${rect.height}px`;
        highlight.style.backgroundColor = element.dataset.color;
      }
    };

    const moveHighlight = (e) => {
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);

      if (hoveredElement && hoveredElement.classList.contains("grid-item")) {
        moveToElement(hoveredElement);
      } else if (
        hoveredElement &&
        hoveredElement.parentElement &&
        hoveredElement.parentElement.classList.contains("grid-item")
      ) {
        moveToElement(hoveredElement.parentElement);
      }
    };

    // Inicializar en el primer item
    moveToElement(firstItem);

    container.addEventListener("mousemove", moveHighlight);

    return () => {
      container.removeEventListener("mousemove", moveHighlight);
      highlight.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, []);

  return (
    <>
      <div className="container" ref={containerRef}>
        <div className="grid">
          <div className="grid-row">
            <div className="grid-item">
              <div className="grid-content">
                <LogoIcon type="nextjs" className="logo-icon" />
                <p>( next.js )</p>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-content">
                <LogoIcon type="typescript" className="logo-icon" />
                <p>( typescript )</p>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-content">
                <LogoIcon type="tailwind" className="logo-icon" />
                <p>( tailwind )</p>
              </div>
            </div>
            
          </div>
          <div className="grid-row">


            <div className="grid-item">
              <div className="grid-content">
                <LogoIcon type="rust" className="logo-icon" />
                <p>( rust )</p>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-content">
                <LogoIcon type="html" className="logo-icon" />
                <p>( html )</p>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-content">
                <LogoIcon type="css" className="logo-icon" />
                <p>( css )</p>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-content">
                <LogoIcon type="react" className="logo-icon" />
                <p>( react )</p>
              </div>
            </div>
            
            
          </div>
        </div>
        <div className="highlight" ref={highlightRef}></div>
      </div>
    </>
  );
}
