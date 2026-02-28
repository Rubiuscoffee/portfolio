"use client";
import "@/features/stack/styles/grid.css";
import { useEffect, useRef, useReducer, useCallback } from "react";
import type { TransitionEvent as ReactTransitionEvent } from "react";
import { LogoIcon } from "@/features/stack/components/LogoIcon";

type State = {
  activeIndex: number | null;
  pendingIndex: number | null;
  isHovered: boolean;
  isHighlightVisible: boolean;
};

type Action =
  | { type: "SET_VISIBILITY"; visible: boolean }
  | { type: "ENTER_CONTAINER" }
  | { type: "SET_PENDING_AND_HOVER"; index: number }
  | { type: "SET_ACTIVE"; index: number }
  | { type: "CLEAR_ACTIVE_AND_PENDING" }
  | { type: "LEAVE" }
  | { type: "TRANSITION_END" };

const initialState: State = {
  activeIndex: null,
  pendingIndex: null,
  isHovered: false,
  isHighlightVisible: true,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_VISIBILITY":
      return { ...state, isHighlightVisible: action.visible };
    case "ENTER_CONTAINER":
      return { ...state, isHovered: true };
    case "SET_PENDING_AND_HOVER":
      return { ...state, pendingIndex: action.index, isHovered: true };
    case "SET_ACTIVE":
      return { ...state, activeIndex: action.index };
    case "CLEAR_ACTIVE_AND_PENDING":
      return { ...state, activeIndex: null, pendingIndex: null };
    case "LEAVE":
      return { ...state, isHovered: false, activeIndex: null, pendingIndex: null };
    case "TRANSITION_END":
      if (state.pendingIndex != null) {
        return { ...state, activeIndex: state.pendingIndex, pendingIndex: null };
      }
      return state;
    default:
      return state;
  }
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { activeIndex, isHovered, isHighlightVisible } = state;

  const HIGHLIGHT_COLOR = "#000000";
  const moveToIndexRef = useRef<((index: number) => void) | null>(null);
  const handleHighlightTransitionEnd = useCallback((e: ReactTransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "transform") return;
    dispatch({ type: "TRANSITION_END" });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const highlight = highlightRef.current;
    if (!container || !highlight) return;

    const updateVisibility = () => {
      const display = window.getComputedStyle(highlight).display;
      dispatch({ type: "SET_VISIBILITY", visible: display !== "none" });
    };
    window.addEventListener("resize", updateVisibility);
    updateVisibility();

    // Definir función de movimiento y exponerla vía ref
    moveToIndexRef.current = (index) => {
      const items = container.querySelectorAll<HTMLDivElement>(".grid-item");
      const element = items[index];
      if (!element) return;

      dispatch({ type: "SET_PENDING_AND_HOVER", index });

      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      highlight.style.transform = `translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px)`;
      highlight.style.width = `${rect.width}px`;
      highlight.style.height = `${rect.height}px`;
      highlight.style.backgroundColor = HIGHLIGHT_COLOR;

      // Control por visibilidad del highlight (móvil)
      const display = window.getComputedStyle(highlight).display;
      if (display === "none") {
        dispatch({ type: "CLEAR_ACTIVE_AND_PENDING" });
        return;
      }

      // Activar inmediatamente el item seleccionado (sin esperar a transitionend)
      dispatch({ type: "SET_ACTIVE", index });
    };

    // Inicializar en el primer item (sin mostrar highlight hasta hover)
    moveToIndexRef.current?.(0);

    return () => {
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <>
      <div
        className="container"
        ref={containerRef}
        onPointerEnter={() => dispatch({ type: "ENTER_CONTAINER" })}
        onPointerLeave={() => {
          dispatch({ type: "LEAVE" });
          // Ocultar visualmente el highlight al salir del contenedor
          if (highlightRef.current) {
            highlightRef.current.style.backgroundColor = "transparent";
            highlightRef.current.style.width = "0px";
            highlightRef.current.style.height = "0px";
            highlightRef.current.style.transform = "translate(0, 0)";
          }
        }}
      >
        <div className="grid">
          <div className="grid-row">
            <div
              className={`grid-item${isHovered && isHighlightVisible && activeIndex === 0 ? " is-active" : ""}`}
              onPointerEnter={() => moveToIndexRef.current?.(0)}
            >
              <div className="grid-content">
                <LogoIcon type="nextjs" className="logo-icon" />
                <p>( next.js )</p>
              </div>
            </div>
            <div
              className={`grid-item${isHovered && isHighlightVisible && activeIndex === 1 ? " is-active" : ""}`}
              onPointerEnter={() => moveToIndexRef.current?.(1)}
            >
              <div className="grid-content">
                <LogoIcon type="typescript" className="logo-icon" />
                <p>( typescript )</p>
              </div>
            </div>
            <div
              className={`grid-item${isHovered && isHighlightVisible && activeIndex === 2 ? " is-active" : ""}`}
              onPointerEnter={() => moveToIndexRef.current?.(2)}
            >
              <div className="grid-content">
                <LogoIcon type="tailwind" className="logo-icon" />
                <p>( tailwind )</p>
              </div>
            </div>
          </div>
          <div className="grid-row">
            <div
              className={`grid-item${isHovered && isHighlightVisible && activeIndex === 3 ? " is-active" : ""}`}
              onPointerEnter={() => moveToIndexRef.current?.(3)}
            >
              <div className="grid-content">
                <LogoIcon type="rust" className="logo-icon" />
                <p>( rust )</p>
              </div>
            </div>
            <div
              className={`grid-item${isHovered && isHighlightVisible && activeIndex === 4 ? " is-active" : ""}`}
              onPointerEnter={() => moveToIndexRef.current?.(4)}
            >
              <div className="grid-content">
                <LogoIcon type="html" className="logo-icon" />
                <p>( html )</p>
              </div>
            </div>
            <div
              className={`grid-item${isHovered && isHighlightVisible && activeIndex === 5 ? " is-active" : ""}`}
              onPointerEnter={() => moveToIndexRef.current?.(5)}
            >
              <div className="grid-content">
                <LogoIcon type="css" className="logo-icon" />
                <p>( css )</p>
              </div>
            </div>
            <div
              className={`grid-item${isHovered && isHighlightVisible && activeIndex === 6 ? " is-active" : ""}`}
              onPointerEnter={() => moveToIndexRef.current?.(6)}
            >
              <div className="grid-content">
                <LogoIcon type="react" className="logo-icon" />
                <p>( react )</p>
              </div>
            </div>
          </div>
        </div>
        <div className="highlight" ref={highlightRef} onTransitionEnd={handleHighlightTransitionEnd}></div>
      </div>
    </>
  );
}
