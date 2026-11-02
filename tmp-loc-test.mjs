import { readFileSync } from "node:fs";
import * as yaml from "js-yaml";
import { buildLocationFilter } from "./scan.mjs";

const cfg = yaml.load(readFileSync("portals.yml", "utf8"));
const lf = buildLocationFilter(cfg.location_filter);

const cases = [
  ["Berlin, Germany", null, "AI Engineer"],
  ["Munich, DE", null, "Machine Learning Engineer"],
  ["Remote - United States", null, "AI Engineer (Remote)"],
  ["Remote - US", null, "Computer Vision Engineer"],
  ["Munich, Germany / New York, USA", null, "Applied AI Engineer"],
  ["Stockholm or London", null, "ML Engineer"],
  ["Bengaluru, India", null, "AI Engineer"],
  ["Berlin, Germany / Bengaluru, India", null, "AI Engineer"],
  ["Amsterdam, Netherlands", null, "Machine Learning Engineer"],
  ["Zurich, Switzerland", null, "Research Engineer"],
  ["Oslo, Norway", null, "Deep Learning Engineer"],
  ["Remote (EU)", null, "AI Engineer"],
  ["Remote - Europe", null, "AI Engineer"],
  ["EMEA", null, "Forward Deployed Engineer"],
  ["Remote", null, "AI Engineer"],
  ["Remote", null, "AI Engineer (Remote)"],
  ["Tel Aviv, Israel", null, "AI Engineer"],
  ["Istanbul, Turkey", null, "Machine Learning Engineer"],
  ["London, UK", null, "AI Engineer"],
  ["Austin, TX", null, "AI Engineer"],
  ["Sydney, Australia", null, "AI Engineer"],
  ["Toronto, Canada", null, "ML Engineer"],
  ["Paris, France", null, "AI Engineer"],
  ["Copenhagen, Denmark", null, "AI Engineer"],
  ["Dublin, Ireland", null, "AI Engineer"],
  ["Vienna, Austria", null, "AI Engineer"],
  ["Helsinki, Finland", null, "AI Engineer"],
  ["", null, "AI Engineer"],
  ["", "https://jobs.lever.co/x/123-berlin", "AI Engineer"],
  ["Worldwide", null, "Machine Learning Engineer"],
  ["Pune, India", null, "AI Engineer"],
  ["Warsaw, Poland", null, "AI Engineer"],
  ["Barcelona, Spain", null, "AI Engineer"],
  ["Lisbon, Portugal", null, "AI Engineer"],
];

let pass = 0, fail = 0;
for (const [loc, url, title] of cases) {
  const ok = lf(loc, url, title);
  const expect = !/united states|remote - us|india|israel|turkey|australia|canada|austin|tel aviv|istanbul|bengaluru|pune/i.test(loc || "");
  const mark = ok === expect ? "ok  " : "MISMATCH";
  if (ok === expect) pass++; else fail++;
  console.log(`${mark} ${ok ? "PASS" : "REJECT"}  ${JSON.stringify(loc)}${url ? " url=" + url : ""}  title=${JSON.stringify(title)}`);
}
console.log(`\n${pass} as expected, ${fail} unexpected`);
