const siteUrl = "https://gauravmrjatt.vercel.app";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gaurav Chaudhary",
  alternateName: "Gauravmrjatt",
  givenName: "Gaurav",
  familyName: "Chaudhary",
  jobTitle: "Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in MERN, LAMP, Next.js, and scalable backend systems.",
  url: siteUrl,
  sameAs: [
    "https://github.com/Gauravmrjatt",
    "https://www.linkedin.com/in/gauravmrjatt",
    "https://www.instagram.com/gauravmrjatt",
    "https://telegram.dog/gauravmrjatt",
  ],
  image: `${siteUrl}/gaurav-chaudhary.png`,
  knowsAbout: [
    "MERN Stack",
    "Next.js",
    "TypeScript",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Node.js",
    "React",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "GLA University",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mathura",
    addressCountry: "IN",
  },
};

const websiteSchema = {
  "@type": "WebSite",
  name: "Gaurav Chaudhary",
  url: siteUrl,
  description:
    "Portfolio website showcasing projects, skills, and experience in full-stack development.",
  author: {
    "@type": "Person",
    name: "Gaurav Chaudhary",
  },
  dateModified: "2026-06-21",
};

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [personSchema, websiteSchema],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
