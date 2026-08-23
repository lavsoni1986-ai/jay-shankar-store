import { notFound } from "next/navigation";
import { getAdminProductById } from "@/lib/db/products";
import { getCategories } from "@/lib/db/categories";
import { getBrands } from "@/lib/db/brands";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditProductPage({ params }: EditPageProps) {
  const { id } = await params;

  const [product, categories, brands] = await Promise.all([
    getAdminProductById(id),
    getCategories(),
    getBrands(),
  ]);

  if (!product) {
    notFound();
  }

  const initialData = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    shortDescription: product.shortDescription,
    categoryId: product.categoryId,
    brandId: product.brandId,
    tags: product.tags,
    isWholesale: product.isWholesale,
    isFeatured: product.isFeatured,
    isPublished: product.isPublished,
    enquiryAvailable: product.enquiryAvailable,
    images: (product.images || []).map((img) => ({
      id: img.id,
      url: img.url,
      publicId: img.publicId,
      alt: img.alt,
      sortOrder: img.sortOrder,
    })),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#0F2A5C]">
          उत्पाद संपादित करें (Edit Product)
        </h1>
        <p className="text-xs text-slate-500">
          उत्पाद विवरण, स्थिति और Cloudinary छवियां अपडेट करें।
        </p>
      </div>

      <ProductForm
        initialData={initialData}
        categories={categories.map((c) => ({ id: c.id, name: c.name, nameHindi: c.nameHindi }))}
        brands={brands.map((b) => ({ id: b.id, name: b.name }))}
        isEditing={true}
      />
    </div>
  );
}
