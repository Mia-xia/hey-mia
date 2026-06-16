import type { MDXComponents } from "mdx/types";
import { LivePhoto } from "@/components/mdx/LivePhoto";
import { MediaImage } from "@/components/mdx/MediaImage";
import { MediaVideo } from "@/components/mdx/MediaVideo";

export const mdxComponents: MDXComponents = {
  MediaImage,
  MediaVideo,
  LivePhoto,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
