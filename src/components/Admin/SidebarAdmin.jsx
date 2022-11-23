import React, { useState, useEffect } from "react";
import { BiMenu, BiDetail, BiColumns, BiCartAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }, [matches, query]);

    return matches;
  };
  let menuItems = [
    {
      name: "داشبورد",
      iconName: <BiMenu />,
    },
    {
      name: "تمام محصولات",
      iconName: <BiColumns />,
      href: '/panelAdmin'
    },
    {
      name: "سفارشات",
      iconName: <BiCartAlt />,
      href: '/orders'
    },
    {
      name: "مدیریت موجودی و قیمت",
      iconName: <BiDetail />,
      href: '/inventory'
    },
    {
      name: "پیام ها",
      iconName: <BiColumns />,
    },
    {
      name: "خروج",
      iconName: <BiColumns />,
    },
  ];
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(1);
  const [animate, setAnimate] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const changeSmall = useMediaQuery("(max-height: 550px)");
  let delay = 1;
  useEffect(() => {
    setAnimate(true);
    let timer = setTimeout(() => setAnimate(false), delay * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [active, delay]);

  return (
    <div className={` bg-[#151414] absolute right-0  text-[#cbcbcb] shadow-lg border-black border-r-0 h-auto min-h-full w-16 flex flex-col items-center justify-start transition-shadow  py-5 ${expanded && " w-56 items-start "}`}>
      {menuItems.map((item, index) => {
        let middle = false;
        if (!(index === 0 || index === menuItems.length - 1)) {
          middle = true;
        }
        return (
          <div
            className={`w-full flex justify-start  cursor-pointer relative ${expanded}`}
            onMouseEnter={() => {
              if (middle) {
                setHovered(index);
              }
            }}
            onMouseLeave={() => {
              if (middle) {
                setHovered(null);
              }
            }}
            onClick={() => {
              if (middle) {
                setActive(index);
              }
              if (index === 0) {
                setExpanded(!expanded);
              }
            }}
            key={index}
          >
            <Link to={item.href} className="flex items-center text-4xl">
              <p className="m-2 text-[#8c2973]">{item.iconName}</p>
              <p
                className={`opacity-0 absolute text-xl
                ${expanded && " opacity-100 pr-12"}
                ${active === index && ""}`}
              >
                {item.name}
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarAdmin