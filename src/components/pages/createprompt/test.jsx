import React,{useState, useRef} from "react";

function NameBox() {
  const test123 = useRef("test");
  return <div>{test123}</div>;
}

export default NameBox;