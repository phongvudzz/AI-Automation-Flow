import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    metadataBase: new URL("https://v4.shadcn.com"),
    description: siteConfig.description,
    keywords: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Server Components",
      "Radix UI",
    ],
    authors: [
      {
        name: "shadcn",
        url: "https://shadcn.com",
      },
    ],
    creator: "shadcn",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://v4.shadcn.com",
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: "https://v4.shadcn.com/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: ["https://v4.shadcn.com/opengraph-image.png"],
      creator: "@shadcn",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
  }