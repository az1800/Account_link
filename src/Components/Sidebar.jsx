import React, { useState, useEffect } from "react";
import {
  FiChevronDown,
  FiHome,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
// Icons as simple JSX elements using SVG
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-home"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const AnalyticsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-pie-chart"
  >
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
  </svg>
);

const MessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-mail"
  >
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-user"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-settings"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const HelpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-help-circle"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" x2="12.01" y1="17" y2="17"></line>
  </svg>
);

const Sidebar = ({ menuItems, selected, setSelected }) => {
  const [open, setOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on initial render and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      //768
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setOpen(false);
      }
    };

    // Check on component mount
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* Mobile overlay when sidebar is open */}
      {isMobile && open && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile toggle button - only visible on small screens */}
      {isMobile && !open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-md bg-apple-blue text-white shadow-md lg:hidden"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" x2="21" y1="6" y2="6"></line>
            <line x1="3" x2="21" y1="12" y2="12"></line>
            <line x1="3" x2="21" y1="18" y2="18"></line>
          </svg>
        </button>
      )}

      <nav
        className={`fixed top-0 left-0 z-30 h-screen border-r border-slate-300 bg-white shadow-sm transition-all duration-300 ${
          isMobile && !open ? "-translate-x-full" : "translate-x-0"
          // "translate-x-0"
          //  "-translate-x-full"
        }`}
        style={{
          width: open ? "240px" : "90px",
        }}
      >
        <div className="flex h-full flex-col">
          <TitleSection open={open} />

          <div className="flex-1 overflow-y-auto px-2 py-4">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Option
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  selected={selected}
                  setSelected={setSelected}
                  open={open}
                />
              ))}
            </div>
          </div>

          <ToggleButton open={open} setOpen={setOpen} />
        </div>
      </nav>
    </>
  );
};
const Option = ({ icon, title, selected, setSelected, open, notifs }) => {
  return (
    <button
      onClick={() => setSelected(title)}
      className={`relative flex h-12 w-full items-center rounded-md transition-all duration-200 ${
        selected === title
          ? "sidebar-item-active bg-[]"
          : "text-slate-500 sidebar-item-hover"
      }`}
    >
      <div className="grid h-full w-[70px] place-content-center text-lg">
        {icon}
      </div>
      {open && (
        <span
          className={`text-sm font-medium tracking-tight transition-all duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          {title}
        </span>
      )}

      {notifs && open && (
        <span
          className={`absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-apple-blue text-xs font-medium text-white transition-all duration-200 ${
            open ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          {notifs}
        </span>
      )}
    </button>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="border-b border-slate-300 p-4">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-3">
          <Logo />
          {open && (
            <div
              className={`transition-all duration-200 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="block text-sm font-semibold tracking-tight">
                Abdulaziz Almousa
              </span>
              <span className="block text-xs text-slate-500">
                Administrator
              </span>
            </div>
          )}
        </div>
        {open && <FiChevronDown />}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-apple-blue transition-transform duration-200 hover:scale-105 active:scale-95">
      <span className="text-lg font-bold text-white">A</span>
    </div>
  );
};

const ToggleButton = ({ open, setOpen }) => {
  return (
    <div className="border-t border-slate-300 p-4">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100"
      >
        <div className="grid h-8 w-[40px] place-content-center text-lg">
          {document.dir === "rtl" ? (
            <div
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            >
              <FiChevronsLeft />
            </div>
          ) : (
            <div
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            >
              <FiChevronsRight />
            </div>
          )}
        </div>
        {open && (
          <span
            className={`text-sm font-medium tracking-tight transition-all duration-200 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {open ? "Collapse Sidebar" : "Expand Sidebar"}
          </span>
        )}
      </button>
    </div>
  );
};

export default Sidebar;
