import { PrintButton } from "@/components/PrintButton";
import { SectionLabel } from "@/components/SectionLabel";
import {
  CV_ACHIEVEMENTS,
  CV_EDUCATION,
  CV_EXPERIENCE,
  CV_HEAD,
  CV_PROJECTS,
  CV_SKILLS,
} from "@/lib/cv";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";

const meta = SECTIONS.find((s) => s.id === "cv")!;

/**
 * Site Review Obs 05 — inline single-column CV, rendered in bone-on-ink
 * inverse. Cmd+P yields the same layout as the downloaded PDF — one source
 * of truth.
 */
export function CV() {
  return (
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="section-rule relative px-6 pt-20 pb-28"
    >
      <div className="absolute left-6 top-6" id={`${meta.anchor}-label`}>
        <SectionLabel section={meta} total={SECTION_TOTAL} />
      </div>

      <div className="mx-auto max-w-[1100px] mt-20">
        <div className="bg-bone text-ink p-8 sm:p-12 lg:p-16 border hairline">
          <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2
                className="font-sans font-black"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
              >
                {CV_HEAD.name}
              </h2>
              <p className="mono-sm mt-3 text-[#444]">
                {CV_HEAD.role} · {CV_HEAD.location} · {CV_HEAD.email} · {CV_HEAD.github}
              </p>
            </div>
            <p className="label-mono text-[#888]">CV · v1 · 19 MAY 2026</p>
          </header>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
            <aside className="space-y-8">
              <Block heading="Education">
                <CvEntryView entry={CV_EDUCATION} />
              </Block>

              <Block heading="Skills">
                <p className="text-[14px] leading-[1.55] text-[#222]">
                  {CV_SKILLS.join(" · ")}
                </p>
              </Block>

              <Block heading="Achievements">
                <ul className="space-y-3">
                  {CV_ACHIEVEMENTS.map((a) => (
                    <li key={a.title}>
                      <p className="font-semibold text-[14px]">{a.title}</p>
                      <p className="text-[13px] text-[#444] leading-[1.5]">{a.body}</p>
                    </li>
                  ))}
                </ul>
              </Block>
            </aside>

            <div className="space-y-10">
              <Block heading="Experience">
                <div className="space-y-6">
                  {CV_EXPERIENCE.map((ent) => (
                    <CvEntryView key={ent.title} entry={ent} />
                  ))}
                </div>
              </Block>

              <Block heading="Selected projects">
                <div className="space-y-6">
                  {CV_PROJECTS.map((ent) => (
                    <CvEntryView key={ent.title} entry={ent} />
                  ))}
                </div>
              </Block>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#d6d3cb] flex flex-wrap gap-3">
            <a
              href="/cv/Bilawal-Ullah-Sami-CV.pdf"
              download
              data-cursor="hover"
              className="label-mono bg-ink text-bone px-4 py-2.5 hover:bg-[#222] transition-colors"
            >
              DOWNLOAD CV.PDF ↓
            </a>
            <PrintButton className="label-mono border border-ink text-ink px-4 py-2.5 hover:bg-ink hover:text-bone transition-colors">
              PRINT THIS PAGE ⌘P
            </PrintButton>
            <a
              href="#section-007"
              data-cursor="hover"
              className="label-mono border border-ink text-ink px-4 py-2.5 hover:bg-ink hover:text-bone transition-colors"
            >
              EMAIL ME ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label-mono text-[#555] mb-3">{heading}</p>
      {children}
    </div>
  );
}

function CvEntryView({
  entry,
}: {
  entry: { title: string; when: string; bullets: string[] };
}) {
  return (
    <div>
      <p className="font-semibold text-[15px] tracking-tight">{entry.title}</p>
      <p className="mono-sm text-[#555] mb-2">{entry.when}</p>
      <ul className="space-y-1.5">
        {entry.bullets.map((b, i) => (
          <li key={i} className="text-[14px] text-[#222] leading-[1.5]">
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
