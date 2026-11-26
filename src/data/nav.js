export const NAV = [
  { id: "home", label: "Home", to: "/" },
  { id: "about", label: "About", to: "/about" },
  { id: "skills", label: "Skills", to: "/skills" },
  { id: "projects", label: "Projects", to: "/projects" },
  { id: "contact", label: "Contact", to: "/contact" },
];

// position of the current URL in NAV, or -1 when it is not one of our pages (404)
export const indexForPath = (pathname) => {
  const path = pathname.replace(/\/+$/, "") || "/";
  return NAV.findIndex((n) => n.to === path);
};
