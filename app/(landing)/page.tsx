import prisma from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });
  return (
    <h1 className="text-3xl font-bold underline">
      {JSON.stringify(posts, null, 2)}
    </h1>
  );
}
