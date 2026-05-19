import { SectionLabel } from "@/components/SectionLabel";
import { Timeline } from "@/components/Timeline";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";

const meta = SECTIONS.find((s) => s.id === "about")!;

interface Row {
  label: string;
  body: React.ReactNode;
}

const ROWS: Row[] = [
  { label: "LOCATION", body: <>Manchester, UK</> },
  {
    label: "EDUCATION",
    body: (
      <>
        Edge Hill University, BSc Software Engineering
        <br />
        Predicted First Class Honours, graduating 2026
      </>
    ),
  },
  {
    label: "STACK",
    body: <>TypeScript · React · React Native · Next.js · Python · Postgres</>,
  },
  {
    label: "RUNNING",
    body: <>Seraphize Ltd — profitable Amazon FBA, UK + EU markets</>,
  },
];

export function About() {
  return (
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="section-rule relative px-6 pt-20 pb-28"
    >
      <div className="absolute left-6 top-6" id={`${meta.anchor}-label`}>
        <SectionLabel section={meta} total={SECTION_TOTAL} />
      </div>

      <div className="mx-auto max-w-[1400px] mt-20">
        {/* career rail across the section */}
        <Timeline />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          <dl className="space-y-7">
            {ROWS.map((row) => (
              <div key={row.label} className="grid grid-cols-1 gap-2">
                <dt className="label-mono text-ash">{row.label}</dt>
                <dd className="mono-sm text-bone leading-[1.7]">{row.body}</dd>
              </div>
            ))}
          </dl>

          <div className="lg:col-span-2 space-y-7 max-w-[58ch]">
            <p
              className="text-bone"
              style={{ fontSize: "1.125rem", lineHeight: 1.55 }}
            >
              I build full products solo, end to end. Auth, schema, pipelines, payments, the UI — all of it. Three of those products are live and used by real people. One is my dissertation, the other two are side projects that grew into apps with paying users.
            </p>
            <p
              className="text-bone"
              style={{ fontSize: "1.125rem", lineHeight: 1.55 }}
            >
              Outside of code: badminton, music production, building a company that funds my own runway.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
