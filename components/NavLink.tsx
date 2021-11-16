import React from "react";
import { scrollTo } from "../utils";
import { useContextTypes } from "../customHooks/useContextTypes";

interface INavLinkProps {
  navLinkId: string;
  scrollToId: string;
}

const NavLink: React.FC<INavLinkProps> = ({ navLinkId, scrollToId }) => {
  const { activeNavLinkId, setActiveNavLinkId } = useContextTypes();

  const handleClick = () => {
    setActiveNavLinkId(navLinkId);

    scrollTo({ id: scrollToId, duration: 1500 });
  };

  return (
    <span
      id={navLinkId}
      className={activeNavLinkId === navLinkId ? "activeClass" : ""}
      onClick={handleClick}
    >
      {navLinkId}
      <style jsx>{`
        span {
          font-size: 18px;
          border-bottom: 1px solid transparent;
          transition: border-bottom 0.2s ease;
          transition-delay: 0.25s;
          margin: 1em;
          padding-bottom: 0.3em;
        }

        span:hover {
          cursor: pointer;
          border-bottom: 1px solid white;
        }

        span.activeClass {
          border-bottom-color: white;
        }
      `}</style>
    </span>
  );
};

export default NavLink;
