import Link from "next/link";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu, X, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { UserButton, useUser } from "@clerk/nextjs";
import Logo from "@/components/global/logo";

export const Navbar = () => {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const onCloseMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Logo isLanding />
        <nav className="hidden md:flex gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Testimonials
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
        </nav>
        <div className="hidden md:flex gap-4 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button asChild className="rounded-full">
            <Link href="/dashboard">
              {user ? "Dashboard" : "Get Started"}
              <ChevronRight className="size-4" />
            </Link>
          </Button>
          {user ? <UserButton /> : null}
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && <MobileMenu onCloseMenu={onCloseMenu} />}
    </header>
  );
};

function MobileMenu({ onCloseMenu }: { onCloseMenu: () => void }) {
  const { user } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
    >
      <div className="container py-4 flex flex-col gap-4">
        <Link
          href="#features"
          className="py-2 text-sm font-medium"
          onClick={onCloseMenu}
        >
          Features
        </Link>
        <Link
          href="#testimonials"
          className="py-2 text-sm font-medium"
          onClick={onCloseMenu}
        >
          Testimonials
        </Link>
        <Link
          href="#pricing"
          className="py-2 text-sm font-medium"
          onClick={onCloseMenu}
        >
          Pricing
        </Link>
        <Link
          href="#faq"
          className="py-2 text-sm font-medium"
          onClick={onCloseMenu}
        >
          FAQ
        </Link>
        <div className="flex flex-col gap-2 pt-2 border-t">
          <Button className="rounded-full" asChild>
            <Link href="/dashboard">
              {user ? "Dashboard" : "Get Started"}
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
