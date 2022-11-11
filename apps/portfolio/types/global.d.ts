type StaticImageData = import("next/future/image").StaticImageData;

type Project = {
  name: "Minesweeper" | "Snake" | "Loldata" | "Taskout";
  image: StaticImageData;
  shortDesc: string;
  longDesc: string;
  links: { demo: string; source: string };
};

type Contact = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
