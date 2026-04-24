import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type CloudinaryUploadResult = {
  secure_url?: string;
};

type ProductForm = {
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  in_stock: "TRUE" | "FALSE";
};

type CloudinaryWidget = {
  open: () => void;
};

type CloudinaryGlobal = {
  createUploadWidget: (
    options: Record<string, unknown>,
    callback: (error: unknown, result: { event?: string; info?: CloudinaryUploadResult }) => void,
  ) => CloudinaryWidget;
};

declare global {
  interface Window {
    cloudinary?: CloudinaryGlobal;
  }
}

const SHEETDB_PRODUCTS_API = "https://sheetdb.io/api/v1/nls9a6jqmvg5j";
const ADMIN_AUTH_KEY = "m3_admin_auth";

const categories = ["bagasse", "plastic", "wooden", "paper", "signage", "poster", "wallpapers"];

const defaultForm: ProductForm = {
  name: "",
  category: "bagasse",
  price: "",
  description: "",
  image: "",
  in_stock: "TRUE",
};

const Admin = () => {
  const [passcode, setPasscode] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [form, setForm] = useState<ProductForm>(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const adminPasscode = useMemo(() => import.meta.env.VITE_ADMIN_PASSCODE || "change-me-admin", []);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";

  useEffect(() => {
    const existingAuth = localStorage.getItem(ADMIN_AUTH_KEY) === "ok";
    if (existingAuth) setIsAuthed(true);
  }, []);

  useEffect(() => {
    if (document.getElementById("cloudinary-upload-widget")) return;
    const script = document.createElement("script");
    script.id = "cloudinary-upload-widget";
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode !== adminPasscode) {
      toast.error("Incorrect admin passcode.");
      return;
    }
    localStorage.setItem(ADMIN_AUTH_KEY, "ok");
    setIsAuthed(true);
    toast.success("Admin login successful.");
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthed(false);
  };

  const openUploadWidget = () => {
    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary is not configured. Add env vars first.");
      return;
    }

    if (!window.cloudinary) {
      toast.error("Cloudinary widget is still loading. Try again in a second.");
      return;
    }

    setUploading(true);
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ["local", "url", "google_drive", "dropbox"],
        multiple: false,
        maxFiles: 1,
        folder: "m3-products",
        resourceType: "image",
      },
      (_error, result) => {
        if (result?.event === "success" && result?.info?.secure_url) {
          setForm((prev) => ({ ...prev, image: result.info?.secure_url || "" }));
          toast.success("Image uploaded successfully.");
          setUploading(false);
        }
        if (result?.event === "close") {
          setUploading(false);
        }
      },
    );

    widget.open();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      data: [
        {
          name: form.name,
          category: form.category,
          price: form.price,
          description: form.description,
          image: form.image,
          in_stock: form.in_stock,
        },
      ],
    };

    try {
      const response = await fetch(SHEETDB_PRODUCTS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      toast.success("Product added successfully.");
      setForm(defaultForm);
    } catch {
      toast.error("Failed to add product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20 pb-20 bg-background min-h-[calc(100vh-4rem)]">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="glass-card rounded-2xl p-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground mb-8">
              Add products and upload images for your catalog.
            </p>

            {!isAuthed ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <label className="block text-sm font-medium text-foreground">
                  Admin Passcode
                </label>
                <Input
                  type="password"
                  placeholder="Enter admin passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Product name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <Input
                    name="price"
                    placeholder='Price (e.g. "$2.50 / unit")'
                    value={form.price}
                    onChange={handleChange}
                    required
                  />

                  <Textarea
                    name="description"
                    placeholder="Product description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />

                  <div className="space-y-2">
                    <Input
                      name="image"
                      placeholder="Image URL"
                      value={form.image}
                      onChange={handleChange}
                      required
                    />
                    <Button type="button" variant="outline" onClick={openUploadWidget} disabled={uploading}>
                      {uploading ? "Uploading..." : "Upload Image (Cloudinary)"}
                    </Button>
                  </div>

                  <select
                    name="in_stock"
                    value={form.in_stock}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="TRUE">In Stock</option>
                    <option value="FALSE">Out of Stock</option>
                  </select>

                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Saving..." : "Add Product"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
