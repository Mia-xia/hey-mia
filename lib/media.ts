export type MediaKind = "photo" | "live" | "video";

export type MediaItem = {
  id: string;
  kind: MediaKind;
  title: string;
  caption?: string;
  src: string;
  alt: string;
  videoSrc?: string;
  featured?: boolean;
};

export const mediaItems: MediaItem[] = [
  {
    id: "polaroid-dinner",
    kind: "photo",
    title: "📍 徐州相聚",
    caption: "",
    src: "/media/photos/polaroid-dinner.jpg",
    alt: "A polaroid photo held above a dinner table",
    featured: true,
  },
  {
    id: "polaroid-table",
    kind: "photo",
    title: "相聚河流",
    caption: "是的，全世界的水都会重逢",
    src: "/media/photos/moment-1016.jpg",
    alt: "Several polaroid photos spread on a wooden table",
    featured: true,
  },
  {
    id: "polaroid-home",
    kind: "photo",
    title: "下次再见",
    caption: "",
    src: "/media/photos/moment-1017.jpg",
    alt: "A polaroid photo held above a table with markers",
    featured: true,
  },
  {
    id: "sunset-mountain",
    kind: "photo",
    title: "美好晚霞",
    caption: "最近的bai京，实在是很美",
    src: "/media/photos/sunset-mountain.jpg",
    alt: "Orange sunset over mountains and clouds",
  },
  {
    id: "moment-0954",
    kind: "photo",
    title: "好喝的酒",
    caption: "",
    src: "/media/photos/moment-0954.jpg",
    alt: "Personal life moment photo 0954",
  },
  {
    id: "moment-0998",
    kind: "photo",
    title: "河流的落日很美妙",
    caption: "",
    src: "/media/photos/moment-0998.jpg",
    alt: "Personal life moment photo 0998",
  },
  {
    id: "moment-1002",
    kind: "photo",
    title: "Music Moment",
    caption: "",
    src: "/media/photos/moment-1002.jpg",
    alt: "Personal life moment photo 1002",
  },
  {
    id: "moment-1007",
    kind: "photo",
    title: "Anpu",
    caption: "",
    src: "/media/photos/moment-1007.jpg",
    alt: "Personal life moment photo 1007",
  },
];

export function getFeaturedMedia(limit = 3) {
  return mediaItems.filter((item) => item.featured).slice(0, limit);
}
