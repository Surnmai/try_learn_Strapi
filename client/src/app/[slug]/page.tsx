import { getPageBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";

async function loader(slug: string) {
  // destructure the data
  const { data } = await getPageBySlug(slug);
  //   console.log(data);
  //   console.log(data[0]);

  if (data.length === 0) notFound();

  return { blocks: data[0]?.blocks };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicPageRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const { blocks } = await loader(slug);
  return <BlockRenderer blocks={blocks} />;
}
