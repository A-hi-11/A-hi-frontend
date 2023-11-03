import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatSidebar.module.css";

const Sidebar = ({ width = 280 }) => {
  const [xPosition, setX] = useState(-width);
  const side = useRef();

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(() => 0);
    } else {
      setX(() => -width);
    }
  };

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideChildren = side.current.contains(e.target);
    if (xPosition > 0 && (!sideArea || !sideChildren)) {
      await setX(-width);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  return (
    <div className={styles.container}>
      <div
        ref={side}
        className={styles.sidebar}
        style={{
          width: `${width}px`,
          height: "100%",
          transform: `translatex(${-xPosition}px)`,
        }}
      >
        <button onClick={() => toggleMenu()} className={styles.button}>
          이용내역
        </button>
        <div className={styles.content}>이용내역이 나열될 공간</div>
      </div>
    </div>
  );
};

export default Sidebar;