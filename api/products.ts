type ProductRow = Record<string, unknown>;

type ProductsApiSuccess = {
  success: true;
  data: ProductRow[];
};

type ProductsApiError = {
  success: false;
  error: string;
};

type ProductsApiResponse = ProductsApiSuccess | ProductsApiError;

type VercelRequest = {
  method?: string;
};

type VercelResponse = {
  status: (statusCode: number) => VercelResponse;
  json: (body: ProductsApiResponse) => void;
  setHeader: (name: string, value: string | string[]) => void;
};

const GOOGLE_APPS_SCRIPT_PRODUCTS_URL =
  process.env.GOOGLE_APPS_SCRIPT_PRODUCTS_URL ||
  process.env.GOOGLE_APPS_SCRIPT_CONTACT_URL ||
  "https://script.google.com/macros/s/AKfycbxJuPvKS6mLC_md6wTtUDqIx1-Lbowg-61A8A0QFPaDeaINIeneTTxE5bzY01Rn1CVh5Q/exec";

const toProductRows = (payload: unknown): ProductRow[] => {
  if (Array.isArray(payload)) return payload.filter((item) => Boolean(item && typeof item === "object"));

  if (payload && typeof payload === "object" && Array.isArray((payload as { data?: unknown }).data)) {
    return (payload as { data: unknown[] }).data.filter((item) => Boolean(item && typeof item === "object")) as ProductRow[];
  }

  return [];
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      success: false,
      error: "Method Not Allowed",
    });
  }

  try {
    const upstreamResponse = await fetch(GOOGLE_APPS_SCRIPT_PRODUCTS_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!upstreamResponse.ok) {
      return res.status(502).json({
        success: false,
        error: `Upstream request failed with status ${upstreamResponse.status}`,
      });
    }

    const raw = (await upstreamResponse.json()) as unknown;
    const rows = toProductRows(raw);

    return res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error";

    return res.status(500).json({
      success: false,
      error: message,
    });
  }
}
