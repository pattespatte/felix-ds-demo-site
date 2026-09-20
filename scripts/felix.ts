/**
 * Hjälpreda för projektets felix-ds-beroende (temalagret ovanpå FKUI).
 *
 * felix-ds publiceras inte till npm utan installes som en git-beroende låst
 * till en exakt commit, så "senaste version" här är senaste commit på
 * standardgrenen – inte en dist-tag.
 *
 * Användning:
 *   bun run felix version               visa specifierad, installerad och senaste commit
 *   bun run felix upgrade -n            torrkörning: visa uppgraderingsplanen, ändra inget
 *   bun run felix upgrade               uppgradera till senaste commit och kör bun install
 *   bun run felix upgrade <ref>         som ovan, men till valt sha/gren/tagg
 *
 * Konventioner som skriptet följer:
 * - beroendet låses till en exakt commit-sha (github:pattespatte/felix-ds#<sha>)
 * - node_modules innehåller ingen sha-markering, så "installerad" visar
 *   paketets version ur node_modules – sha-jämförelsen görs mot package.json
 * - commitdatum och ämnesrad hämtas ur GitHub-API:t, inte hårdkodade här
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGE_JSON = resolve(ROOT, "package.json");
const REPO = "pattespatte/felix-ds";
const REPO_URL = `https://github.com/${REPO}.git`;
const API = `https://api.github.com/repos/${REPO}/commits`;

interface CommitInfo {
    sha: string;
    date: string;
    subject: string;
}

function fail(message: string): never {
    console.error(`Fel: ${message}`);
    process.exit(1);
}

function readJson(path: string): Record<string, unknown> {
    return JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
}

/** Beroendets specifier i package.json, t.ex. github:pattespatte/felix-ds#abc123. */
function felixSpecifier(pkg: Record<string, unknown>): string {
    const deps = pkg["dependencies"];
    if (deps === undefined || typeof deps !== "object" || deps === null) {
        fail("ingen dependencies-sektion i package.json");
    }
    const specifier = (deps as Record<string, string>)["felix-ds"];
    if (specifier === undefined) {
        fail("felix-ds hittades inte bland dependencies i package.json");
    }
    return specifier;
}

/** Shan ur en github:-specifier, eller null om den inte är sha-låst. */
function specifierSha(specifier: string): string | null {
    const match = /#([0-9a-f]{7,40})$/.exec(specifier);
    return match ? match[1] : null;
}

function shortSha(sha: string): string {
    return sha.slice(0, 7);
}

/** Versionen som faktiskt ligger i node_modules, om den går att läsa. */
function installedVersion(): string {
    const manifest = resolve(ROOT, "node_modules", "felix-ds", "package.json");
    if (!existsSync(manifest)) {
        return "–";
    }
    const version = readJson(manifest)["version"];
    return typeof version === "string" ? version : "–";
}

/** Körs `git ls-remote` mot repot och returnerar råutskriften. */
function lsRemote(): string {
    const result = spawnSync("git", ["ls-remote", REPO_URL], {
        encoding: "utf8",
    });
    if (result.error !== undefined || result.status !== 0) {
        fail(`kunde inte läsa ${REPO_URL} med git ls-remote`);
    }
    return result.stdout;
}

/** Senaste commit på standardgrenen (HEAD). */
function latestSha(): string {
    for (const line of lsRemote().split("\n")) {
        const [sha, ref] = line.split(/\s+/);
        if (ref === "HEAD") {
            return sha;
        }
    }
    return fail("HEAD hittades inte i ls-remote-svaret");
}

/** Löser en användarangiven ref (sha, gren eller tagg) till en full sha. */
function resolveRef(ref: string): string {
    if (/^[0-9a-f]{40}$/.test(ref)) {
        return ref;
    }
    for (const line of lsRemote().split("\n")) {
        const [sha, name] = line.split(/\s+/);
        if (name === `refs/heads/${ref}` || name === `refs/tags/${ref}`) {
            return sha;
        }
    }
    return fail(
        `refsen ${ref} hittades inte som gren eller tagg i ${REPO_URL} (ett kort sha fungerar inte – ange gren, tagg eller full sha)`,
    );
}

/** Datum och ämnesrad för en commit ur GitHub-API:t. */
async function commitInfo(sha: string): Promise<CommitInfo> {
    const response = await fetch(`${API}/${sha}`, {
        headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) {
        fail(`kunde inte hämta ${API}/${sha} (HTTP ${response.status})`);
    }
    const commit = (await response.json()) as {
        sha?: string;
        commit?: { committer?: { date?: string }; message?: string };
    };
    return {
        sha,
        date: commit.commit?.committer?.date?.slice(0, 10) ?? "–",
        subject: commit.commit?.message?.split("\n")[0] ?? "–",
    };
}

const usage = `Användning:
  bun run felix version            visa specifierad, installerad och senaste commit
  bun run felix upgrade [-n] [ref]
      -n, --dry-run                visa planen utan att ändra något
      ref                          sha, gren eller tagg i stället för senaste commit`;

async function runVersion(): Promise<void> {
    const pkg = readJson(PACKAGE_JSON);
    const specifier = felixSpecifier(pkg);
    const currentSha = specifierSha(specifier);
    const target = await commitInfo(latestSha());

    console.log(`Specifierat:  ${specifier}`);
    console.log(`Installerat:  ${installedVersion()} (node_modules saknar sha-markering)`);
    console.log(
        `Senaste:      ${shortSha(target.sha)} (${target.date}) ${target.subject}`,
    );

    if (currentSha === null) {
        console.log(
            "\nOBS: beroendet är inte låst till en sha – lås det med `bun run felix upgrade -n` först och då visas en plan.",
        );
        return;
    }
    if (currentSha === target.sha || currentSha.startsWith(shortSha(target.sha))) {
        console.log(
            `\nAktuellt: felix-ds står på senaste commit på standardgrenen (${shortSha(target.sha)}).`,
        );
    } else {
        const current = await commitInfo(currentSha);
        console.log(
            `\nNuvarande:   ${shortSha(current.sha)} (${current.date}) ${current.subject}`,
        );
        console.log(
            "Kör `bun run felix upgrade -n` för att se planen, `bun run felix upgrade` för att genomföra.",
        );
    }
    if (installedVersion() === "–") {
        console.log("\nOBS: node_modules/felix-ds saknas – kör `bun install`.");
    }
}

async function runUpgrade(
    requested: string | undefined,
    dryRun: boolean,
): Promise<void> {
    const pkg = readJson(PACKAGE_JSON);
    const specifier = felixSpecifier(pkg);
    const currentSha = specifierSha(specifier);
    const targetSha = requested === undefined ? latestSha() : resolveRef(requested);
    const target = await commitInfo(targetSha);
    const current = currentSha
        ? await commitInfo(currentSha)
        : { sha: "", date: "–", subject: specifier };

    if (currentSha === targetSha) {
        console.log(
            `felix-ds står redan på ${shortSha(targetSha)} (${target.subject}). Inget att göra.`,
        );
        return;
    }

    console.log(`Uppgraderingsplan – ${REPO}:`);
    console.log(`  Nu:  ${shortSha(current.sha) || specifier} (${current.date}) ${current.subject}`);
    console.log(`  Mål: ${shortSha(target.sha)} (${target.date}) ${target.subject}`);
    console.log(`\nCommits däremellan: https://github.com/${REPO}/compare/${current.sha || "HEAD"}...${target.sha}`);

    if (dryRun) {
        console.log(
            "\nTorr körning – inget har ändrats. En riktig körning hade skrivit den nya sha:n i package.json och kört `bun install`.",
        );
        return;
    }

    (pkg.dependencies as Record<string, string>)["felix-ds"] =
        `github:${REPO}#${target.sha}`;
    writeFileSync(PACKAGE_JSON, `${JSON.stringify(pkg, null, 2)}\n`);
    console.log(`\npackage.json uppdaterad (github:${REPO}#${target.sha}).`);

    const install = spawnSync("bun", ["install"], {
        cwd: ROOT,
        stdio: "inherit",
    });
    if (install.status !== 0) {
        fail("`bun install` misslyckades – kör om det för hand och undersök felet");
    }

    console.log(
        [
            "\nKlart. Följ upp med:",
            "  bun run build            # sökindex + typkontroll + bygge + prerender",
            "  bun run dev              # visuell runda i ljus och mörkt läge",
        ].join("\n"),
    );
}

async function main(): Promise<void> {
    const [command = "version", ...rest] = process.argv.slice(2);
    const dryRun = rest.some((arg) => arg === "-n" || arg === "--dry-run");
    const requested = rest.find((arg) => !arg.startsWith("-"));

    switch (command) {
        case "version":
            await runVersion();
            break;
        case "upgrade":
            await runUpgrade(requested, dryRun);
            break;
        case "help":
        case "--help":
        case "-h":
            console.log(usage);
            break;
        default:
            console.error(`Okänt kommando: ${command}\n`);
            console.log(usage);
            process.exitCode = 1;
    }
}

await main();
