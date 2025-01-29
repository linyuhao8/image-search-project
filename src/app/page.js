"use client";
import Search from "../components/Search";
import ImageGrid from "../components/ImageGrid";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState(null);
  const searchImg = async () => {
    const result = await axios.get(process.env.NEXT_PUBLIC_AUTHURL, {
      headers: { Authorization: process.env.NEXT_PUBLIC_AUTH },
    });
    setData(result);
    console.log(result);
  };

  return (
    <div className="">
      <Search search={searchImg} />
      <ImageGrid />
    </div>
  );
}
