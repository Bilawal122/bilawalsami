import { SectionLabel } from "@/components/SectionLabel";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";

const meta = SECTIONS.find((s) => s.id === "contact")!;

const EMAIL = "bilawal.sami.2@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("From bilawalsami.vercel.app — [your role here]")}`;

const SECONDARY = [
  { label: "LINKEDIN", url: "https://linkedin.com/in/bilawal-sami-1ba691322", value: "linkedin.com/in/bilawal-sami-1ba691322" },
  { label: "CV.PDF", url: "/cv/Bilawal-Ullah-Sami-CV.pdf", value: "DOWNLOAD ↓", download: true as const },
];

export function Contact() {
  return (
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="section-rule relative px-6 pt-20 pb-32"
    >
      <div className="absolute left-6 top-6" id={`${meta.anchor}-label`}>
        <SectionLabel section={meta} total={SECTION_TOTAL} />
      </div>

      <div className="mx-auto max-w-[1200px] mt-20 flex flex-col items-center gap-12 text-center">
        <p className="label-mono text-ash">
          <span className="text-bone">CONTACT</span>
          <span className="mx-2">004</span>
          <span className="text-hairline">/</span>
          <span className="ml-2">004</span>
        </p>

        <a
          href={MAILTO}
          data-cursor="hover"
          className="group relative inline-block font-sans font-bold text-bone hover:text-signal transition-colors break-all"
          style={{
            fontSize: "clamp(1.5rem, 5vw, 4rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {EMAIL}
          <span
            aria-hidden="true"
            className="absolute left-0 bottom-0 h-[2px] w-full origin-left scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100"
            style={{ transformOrigin: "left center" }}
          />
        </a>

        <p className="mono-sm text-ash max-w-[55ch]">
          Best for: grad-role intros, paid freelance leads. Replies within a day, usually faster.
        </p>

        <ul className="mt-6 grid gap-6 sm:grid-cols-2 w-full max-w-[700px]">
          {SECONDARY.map((item) => (
            <li key={item.label} className="flex flex-col items-center gap-2">
              <span className="label-mono text-hairline">{item.label}</span>
              <a
                href={item.url}
                target={item.url.startsWith("http") ? "_blank" : undefined}
                rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                download={"download" in item ? item.download : undefined}
                data-cursor="hover"
                className="label-mono text-bone hover:text-signal transition-colors"
              >
                {item.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
