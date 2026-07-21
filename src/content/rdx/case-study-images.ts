/** Asset paths under public/work/ — WebP sources; Next.js optimizes at serve time */

export const workImagePaths = {
  harligStad: {
    hero: "/work/harlig-stad/hero.webp",
    booking: "/work/harlig-stad/booking-form-automation.webp",
    mobile: "/work/harlig-stad/mobile-view.webp",
    service: "/work/harlig-stad/single-service.webp",
  },
  hexaEducation: {
    hero: "/work/hexa-education/hero-branches-section.webp",
    listeningTest: "/work/hexa-education/online-listening-test.webp",
  },
  ieltsReady: {
    landing: "/work/ieltsready/ieltsready-landing-homepage.webp",
    admin: "/work/ieltsready/ieltsready-adminportal.webp",
    signin: "/work/ieltsready/ieltsready-signin.webp",
  },
  yearInReview: {
    homepage: "/work/yearinreview/YIR-Homepage.webp",
    dashboard: "/work/yearinreview/YIR-Dashboard.webp",
    wheel: "/work/yearinreview/wheel-of-life-YIR.webp",
    responsive: "/work/yearinreview/YIR-Responsive.webp",
  },
  mediHelp: {
    hero: "/work/medi-help/hero.webp",
    chat: "/work/medi-help/chat-feature.webp",
  },
  priorExperience: {
    headlessFullpage: "/work/prior-experience/headless-fullpage.webp",
    marketingAgencyFullpage: "/work/prior-experience/marketing-agency-fullpage.webp",
  },
} as const;

/** @deprecated Use workImagePaths */
export const caseStudyImagePaths = workImagePaths;
