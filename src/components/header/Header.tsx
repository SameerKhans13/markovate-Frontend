"use client";
import { useRef, useState, useEffect } from "react";
import "./header.css";
import Link from "next/link";
const Header = () => {
  const [isAuthed, setIsAuthed] = useState<string>("");
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    if (isAuthed === "#") {
      if (headRef.current) {
        headRef.current.style.opacity = "0";
      }
    } else {
      if (headRef.current) {
        headRef.current.style.opacity = "1";
      }
    }
  }, [isAuthed]);

  const getAuth = () => {
    const auth = JSON.parse(sessionStorage.getItem("auth") || "{}");
    if (auth.isAuthed) {
      setIsAuthed("Dashboard");
    } else {
      setIsAuthed("Register");
    }
  };
  return (
    <>
      <header>
        <div className="progressbar"></div>
        <div className="head" ref={headRef}>
          <div className="empty"></div>
          <Link className="navopt" href={"/"}>
            Home
          </Link>
          <Link className="navopt" href={"/contact"}>
            Contact Us
          </Link>
          <Link className="navopt" href={"/partners"}>
            Partners
          </Link>
          <Link className="navopt" href={"/services"}>
            Services
          </Link>
          <Link className="navopt" href={"/auth"}>
            Sign In
          </Link>
        </div>
      </header>
    </>
  );
};
export default Header;
