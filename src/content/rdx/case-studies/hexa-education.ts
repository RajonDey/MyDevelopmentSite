import type { CaseStudy } from "@/types/rdx/case-study";
import { workImagePaths } from "@/content/rdx/case-study-images";

export const hexaEducation: CaseStudy = {
  slug: "hexa-education",
  title: "HEXA'S Education: institute site and IELTS exam platform",
  summary:
    "Education client: marketing site plus an online IELTS test platform used across branches. Listening, reading, and exam delivery on a preview deployment.",
  clientType: "Education client · IELTS institute",
  industryTag: "Education",
  service: "agency-website",
  serviceLabel: "Website & platform",
  attribution: "rdx-led",
  attributionLabel: "Delivered by RDX Technologies",
  category: "client",
  status: "live",
  liveUrl: "https://hexaseducation.com/",
  relatedLinks: [
    {
      label: "IELTS exam platform (preview deployment)",
      href: "https://ielts-test-platform-0-01.vercel.app/",
    },
  ],
  stack: ["Next.js", "IELTS platform", "Vercel", "Multi-branch exams"],
  challenge:
    "The institute needed a credible public site and a reliable online exam experience for students across locations — not only classroom-based testing.",
  approach:
    "Delivered the marketing site and built the IELTS test platform for branch operations: exam flows, listening components, and admin-ready deployment while a production domain is finalized.",
  deliverables: [
    "hexaseducation.com — institute positioning and programs",
    "Online IELTS test platform (preview deployment)",
    "Listening and exam UI for branch use",
    "2–3 month delivery window with support as needed",
  ],
  outcome:
    "Live institute site plus a platform actively used for real exams across branches — foundation for ongoing iterations and domain cutover.",
  visuals: [
    {
      label: "IELTS listening exam",
      caption: "Online test UI used in branches",
      src: workImagePaths.hexaEducation.listeningTest,
      alt: "HEXA IELTS online listening test interface",
      frameMode: "scroll",
      scrollBehavior: "both",
    },
    {
      label: "Branches & programs",
      caption: "Institute homepage section",
      src: workImagePaths.hexaEducation.hero,
      alt: "HEXA Education website branches section",
      frameMode: "crop",
    },
  ],
  heroVisual: {
    label: "Institute site",
    caption: "hexaseducation.com",
    src: workImagePaths.hexaEducation.hero,
    alt: "HEXA'S Education website homepage",
    frameMode: "crop",
  },
};
