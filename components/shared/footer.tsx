import Link from "next/link"
import { footerLinks } from "@/constants"

import { SiAuth0 } from "react-icons/si"

export const Footer = () => {
  return (
    <footer className="py-6 text-center text-gray-500 text-sm  border-t border-gray-100">
      <p>
        &copy; {new Date().getFullYear()} Moodify. All rights reserved.
      </p>
    </footer>
  );
}