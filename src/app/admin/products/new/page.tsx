import { getCategories } from "@/lib/db/categories";
import { getBrands } from "@/lib/db/brands";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function AdminNewProductPage() {
  const [categories, brands] = await Promise.all([
    getCategories(),
    getBrands(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#0F2A5C]">
          नया उत्पाद जोड़ें (Add New Product)
        </h1>
        <p className="text-xs text-slate-500">
          कैटलॉग में नया थोक उत्पाद जोड़ें और Cloudinary छवियां अपलोड करें।
        </p>
      </div>

      <ProductForm
        categories={categories.map((c) => ({ id: c.id, name: c.name, nameHindi: c.nameHindi }))}
        brands={brands.map((b) => ({ id: b.id, name: b.name }))}
        isEditing={false}
      />
    </div>
  );
}
