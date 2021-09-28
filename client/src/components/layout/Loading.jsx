import React, { Fragment, useEffect, useState } from "react";

const Loading = () => {
  const [semi, setSemi] = useState({
    num: 0,
    text: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Mengubah num semi
      setSemi((c) => ({
        ...c,
        num: c.num + 1,
      }));

      // Mengubah text semi
      setSemi((c) => {
        let text = "";
        for (let i = 0; i < c.num; i++) {
          text += ".";
        }
        return {
          ...c,
          text,
        };
      });

      // Reset num jika lebih dari 3
      if (semi.num >= 3) {
        setSemi((c) => ({
          ...c,
          num: 0,
        }));
      }

      console.log(semi);
    }, 800);

    return () => {
      clearInterval(interval);
    };
  }, [semi]);

  return <Fragment>Loading{semi.text}</Fragment>;
};

export default Loading;
