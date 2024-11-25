import type { Metadata } from "next";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Font Awesome CSS import
import { config } from "@fortawesome/fontawesome-svg-core";

// Disable auto-adding CSS
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Virtual Lab",
  description: "Online Science Lab",
};

const FullLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>{children}</div>
  );
};

export default FullLayout;
