import { APP_NAME } from "@/config/site";
import Link from "next/link";

function Logo({
  isLanding,
  showLogoOnly,
}: {
  isLanding?: boolean;
  showLogoOnly?: boolean;
}) {
  return (
    <Link
      href={`${isLanding ? "/" : "dashboard"}`}
      className="inline-flex items-center gap-2 font-bold"
    >
      <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
        AI
      </div>
      <span
        className={`text-xl duration-500 ease-in-out  ${
          showLogoOnly ? "opacity-0 hidden" : "opacity-100"
        }`}
      >
        {APP_NAME}
      </span>
    </Link>
  );
}

export default Logo;
