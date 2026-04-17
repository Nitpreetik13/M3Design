type ContactRecord = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

type ContactPayload = {
  data: ContactRecord[];
};

type ApiResponse = {
  success: boolean;
  error?: string;
};

type VercelRequest = {
  method?: string;
  body?: unknown;
};

type VercelResponse = {
  status: (statusCode: number) => VercelResponse;
  json: (body: ApiResponse) => void;
  setHeader: (name: string, value: string | string[]) => void;
};

const GOOGLE_APPS_SCRIPT_CONTACT_URL =
  process.env.GOOGLE_APPS_SCRIPT_CONTACT_URL ||
  "https://script.google.com/macros/s/AKfycbxJuPvKS6mLC_md6wTtUDqIx1-Lbowg-61A8A0QFPaDeaINIeneTTxE5bzY01Rn1CVh5Q/exec";

const isValidPayload = (payload: unknown): payload is ContactPayload => {
  if (!payload || typeof payload !== "object") return false;

  const data = (payload as ContactPayload).data;
  if (!Array.isArray(data) || data.length === 0) return false;

  const [first] = data;
  if (!first || typeof first !== "object") return false;

  return Boolean(first.name && first.email && first.message);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      error: "Method Not Allowed",
    });
  }

  try {
    const payload =
      typeof req.body === "string" ? (JSON.parse(req.body) as unknown) : req.body;

    if (!isValidPayload(payload)) {
      return res.status(400).json({
        success: false,
        error: "Invalid payload",
      });
    }

    const upstreamResponse = await fetch(GOOGLE_APPS_SCRIPT_CONTACT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!upstreamResponse.ok) {
      return res.status(502).json({
        success: false,
        error: `Upstream request failed with status ${upstreamResponse.status}`,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error";

    return res.status(500).json({
      success: false,
      error: message,
    });
  }
}
