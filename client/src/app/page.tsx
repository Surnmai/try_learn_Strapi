// import Image from "next/image";
// import styles from "./page.module.css";

// import loader
import { getHomePage } from "../data/loaders";

// import components
// import { HeroSection } from "@/components/blocks/HeroSection";
// import { InfoBlock } from "@/components/blocks/InfoBlock";
import { BlockRenderer } from "@/components/BlockRenderer";

// import notFound
import { notFound } from "next/navigation";

const loader = async () => {
  const data = await getHomePage();
  if (!data) notFound();
  // console.log(data);
  // console.log(data.data);
  return { ...data.data };
};

export default async function HomeRoute() {
  const data = await loader();
  const blocks = data?.blocks || [];
  // console.log(data);
  // console.log(data.title);
  // console.log(data?.blocks);
  // console.log(blocks);

  return (
    <>
      <main>
        {/* <h1>{data.title}</h1>
        <p>{data.description}</p>
        <HeroSection {...blocks[0]} />
        <InfoBlock {...blocks[1]} />
        <InfoBlock {...blocks[2]} /> */}
        <BlockRenderer blocks={blocks} />
      </main>
    </>
  );
}
