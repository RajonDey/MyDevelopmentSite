/** Asset paths under public/work/ — PNG sources; Next.js optimizes at serve time */

export const workImagePaths = {
  harligStad: {
    hero: "/work/harlig-stad/hero.png",
    booking: "/work/harlig-stad/booking-form-automation.png",
    mobile: "/work/harlig-stad/mobile-view.png",
    service: "/work/harlig-stad/single-service.png",
  },
  hexaEducation: {
    hero: "/work/hexa-education/hero-branches-section.png",
    listeningTest: "/work/hexa-education/online-listening-test.png",
  },
  ieltsReady: {
    landing: "/work/ieltsready/ieltsready-landing-homepage.png",
    admin: "/work/ieltsready/ieltsready-adminportal.png",
    signin: "/work/ieltsready/ieltsready-signin.png",
  },
  yearInReview: {
    homepage: "/work/yearinreview/YIR-Homepage.png",
    dashboard: "/work/yearinreview/YIR-Dashboard.png",
    wheel: "/work/yearinreview/wheel-of-life-YIR.png",
    responsive: "/work/yearinreview/YIR-Responsive.png",
  },
  mediHelp: {
    hero: "/work/medi-help/hero.png",
    chat: "/work/medi-help/chat-feature.png",
  },
  priorExperience: {
    headlessFullpage: "/work/prior-experience/headless-fullpage.png",
    marketingAgencyFullpage: "/work/prior-experience/marketing-agency-fullpage.png",
  },
} as const;

/** @deprecated Use workImagePaths */
export const caseStudyImagePaths = workImagePaths;
