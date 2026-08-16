/* Governance Blueprint source generator: YAML remains authoritative; this snapshot is derived. */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parse } from "yaml";

const args = process.argv.slice(2);
function option(name, fallback) {
  const value = args.find((item) => item.startsWith(`--${name}=`));
  if (value) return value.slice(name.length + 3);
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] && !args[index + 1].startsWith("--") ? args[index + 1] : fallback;
}

const sourceDir = resolve(option("source", "../ai-sdlc-policies/packs"));
const target = resolve("client/src/data/policyPacks.generated.ts");
const repository = option("repository", "xdev-ai/ai-sdlc-policies");
const revision = option("revision", process.env.GITHUB_SHA ?? "workspace");
const files = ["agent-launch.yml", "spec-structure.yml", "traceability.yml"];
const slugByFile = { "agent-launch.yml": "agent-launch", "spec-structure.yml": "spec-struct", "traceability.yml": "traceability" };

const packs = await Promise.all(files.map(async (file) => {
  const parsed = parse(await readFile(resolve(sourceDir, file), "utf8"));
  if (!parsed?.id || !parsed?.version || !Array.isArray(parsed.rules)) throw new Error(`Invalid policy pack: ${file}.`);
  return {
    id: String(parsed.id), slug: slugByFile[file], file,
    sourcePath: `packs/${file}`, sourceRepository: repository, sourceRevision: revision,
    version: String(parsed.version), appliesTo: Array.isArray(parsed.applies_to) ? parsed.applies_to.map(String) : [],
    description: String(parsed.description ?? ""),
    rules: parsed.rules.map((rule) => ({
      id: String(rule.id), severity: String(rule.severity), check: String(rule.check), message: String(rule.message),
      arguments: Object.fromEntries(Object.entries(rule).filter(([key]) => !["id", "severity", "message", "check"].includes(key)).map(([key, value]) => [key, String(value)])),
    })),
  };
}));

await writeFile(target, `/* Generated from xdev-ai/ai-sdlc-policies YAML. Do not edit by hand. */\nexport const policyRegistrySnapshot = ${JSON.stringify(packs, null, 2)} as const;\n`, "utf8");
console.log(`Policy Registry snapshot written: ${target} (${packs.length} packs).`);
