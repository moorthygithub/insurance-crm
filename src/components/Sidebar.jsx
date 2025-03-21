import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronRight, FiHome } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShield } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, isCollapsed }) => {
  const [openSubmenu, setOpenSubmenu] = useState("");
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/home",
      icon: FiHome,
    },

    {
      name: "Client ",
      path: "/client-list",
      icon: FaRegUser,
    },
    {
      name: "Renewal ",
      path: "/renewal-list",
      icon: MdOutlineShield,
    },
  ];
  useEffect(() => {
    const currentSubmenu = menuItems.find((item) =>
      item.subitems?.some((subitem) => subitem.path === location.pathname)
    );

    if (currentSubmenu) {
      setOpenSubmenu(currentSubmenu.name);
    }
  }, [location.pathname]);

  const handleSubmenuClick = (itemName) => {
    setOpenSubmenu(openSubmenu === itemName ? "" : itemName);
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed left-0 top-16 h-[calc(100vh-4.5rem)] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "lg:w-[4.5rem]" : "lg:w-64"}
        w-64 z-40 overflow-y-auto`}
      >
        <div className="p-4">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.subitems ? (
                <div
                  onClick={() => handleSubmenuClick(item.name)}
                  className="mb-1 cursor-pointer p-2 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {!isCollapsed && (
                      <div className="flex items-center justify-between flex-1">
                        <span className="text-sm font-medium">{item.name}</span>
                        {openSubmenu === item.name ? (
                          <FiChevronDown className="w-4 h-4" />
                        ) : (
                          <FiChevronRight className="w-4 h-4" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) => `
                  mb-1 flex items-center gap-3 p-2 rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-accent-50 text-accent-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
                >
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </NavLink>
              )}

              {!isCollapsed && item.subitems && openSubmenu === item.name && (
                <div className="ml-9 mb-2">
                  {item.subitems.map((subItem) => (
                    <NavLink
                      key={subItem.name}
                      to={subItem.path}
                      onClick={handleLinkClick}
                      className={({ isActive }) => `
                      py-2 px-3 text-sm rounded-lg block transition-colors
                      ${
                        isActive
                          ? "bg-accent-50 text-accent-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
                    >
                      {subItem.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
