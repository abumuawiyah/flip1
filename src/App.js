import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import "./styles.css";

export default function Square() {
  const squareId = "flipSquare";
  const cachedPosition = useRef();
  const [isBig, setIsBig] = useState(false);

  const elm = document.getElementById(squareId);

  if (elm && cachedPosition.current == null) {
    // cachedPosition.current = elm.getBoundingClientRect();
  }

  function handleClick() {
    setIsBig(!isBig);
  }

  useLayoutEffect(() => {
    console.log("layout", cachedPosition.current.width);
    const el = document.getElementById(squareId);
    if (!el || cachedPosition.current == null) return;

    const rect = el.getBoundingClientRect();
    const scaleX = cachedPosition.current.width / rect.width;
    const scaleY = cachedPosition.current.height / rect.height;

    cachedPosition.current = rect;
    el.style.transition = `none`;
    el.style.transform = `scale(${scaleX}, ${scaleY})`;
    el.style.transformOrigin = `top right`;
  }, [isBig]);

  useEffect(() => {
    console.log("effect");
    const el = document.getElementById(squareId);
    if (!el) return;
    el.style.transition = `transform 500ms`;
    el.style.transform = `none`;
  }, [isBig]);

  const className = "square " + (isBig ? "big" : "small");

  return (
    <div
      ref={cachedPosition}
      id={squareId}
      onClick={handleClick}
      className={className}
    >
      <ul
        style={{
          opacity: isBig ? 1 : 0,
          backgroundColor: "white",
          color: "black",
          width: "100%"
        }}
      >
        <li>testing</li>
        <li>testing</li>
        <li>testing</li>
        <li>testing</li>
        <li>testing</li>
        <li>testing</li>
      </ul>
    </div>
  );
}
