// Build-time fetch of all-time unique visitors from Umami Cloud.
// Runs only during `astro build` (server-side frontmatter), so the API key
// never ships to the browser. Returns null when no key is configured or the
// API is unreachable — callers should hide the count in that case.

const WEBSITE_ID = "2671807b-c765-4bee-b2fc-13d08ed2e85c";
const API_BASE = "https://api.umami.is/v1";

let cached: Promise<number | null> | null = null;

export function getVisitorCount(): Promise<number | null> {
    if (!cached) {
        cached = fetchVisitorCount();
    }
    return cached;
}

async function fetchVisitorCount(): Promise<number | null> {
    try {
        const env = (import.meta as any).env ?? {};
        const procEnv =
            typeof process !== "undefined" ? (process as any).env ?? {} : {};
        const apiKey: string | undefined =
            env.UMAMI_API_KEY ?? procEnv.UMAMI_API_KEY;
        if (!apiKey) return null;

        const endAt = Date.now();
        const res = await fetch(
            `${API_BASE}/websites/${WEBSITE_ID}/stats?startAt=0&endAt=${endAt}`,
            {
                headers: { Authorization: `Bearer ${apiKey}` },
                signal: AbortSignal.timeout(8000),
            },
        );
        if (!res.ok) return null;
        const json = await res.json();
        const data = json?.data ?? json;
        return typeof data?.visitors === "number" ? data.visitors : null;
    } catch {
        return null;
    }
}
