import React from "react";
import { scrollTo } from "../utils";
import { useContextTypes } from "../customHooks/useContextTypes";

interface INavLinkProps {
  navLinkId: string;
  scrollToId: string;
  onMobile: boolean;
}

const NavLink: React.FC<INavLinkProps> = ({
  navLinkId,
  scrollToId,
  onMobile,
}) => {
  const { activeNavLinkId, setActiveNavLinkId } = useContextTypes();

  const handleClick = () => {
    setActiveNavLinkId(navLinkId);

    scrollTo({ id: scrollToId, duration: 1500 });
  };

  return (
    <span
      id={navLinkId}
      className={
        onMobile
          ? "spanMobile"
          : activeNavLinkId === navLinkId
          ? "spanPC activeClass"
          : "spanPC"
      }
      onClick={handleClick}
    >
      {navLinkId}
      <style jsx>{`
        .spanPC {
          font-size: 18px;
          border-bottom: 2px solid transparent;
          transition: border-bottom 0.15s ease;
          transition-delay: 0.25s;
          margin: 1em;
          padding-bottom: 0.5em;
        }

        .spanPC:hover {
          cursor: pointer;
          border-bottom: 2px solid white;
        }

        .activeClass {
          border-bottom-color: white;
        }
      `}</style>
    </span>
  );
};

export default NavLink;
