import { product, product_userLiked } from "./../schema/ProductSchema";
import { db } from "@/db/db";
import { labels, product_image, product_label } from "@/schema/ProductSchema";
import { and, asc, eq, like, sql } from "drizzle-orm";
import { getUserById, getUserLikedProductsLabel } from "./user";
import EdgeRank from "@/helper/EdgeRank";
import { users } from "@/schema/userSchema";

//TODO : Optimize the db calls by minimizing no of db calls in one function

const getProductDataWithLabels = async (filterBy, sortBy) => {
  if (filterBy === "null") {
    const products = await db
      .select({ ...product, label: labels.label })
      .from(product)
      .limit(100)
      .innerJoin(product_label, eq(product_label.productId, product.id))
      .innerJoin(labels, eq(labels.id, product_label.labelId));
    return products;
  } else if (filterBy !== null) {
    const products = await db
      .select({ ...product, label: labels.label })
      .from(product)
      .limit(50)
      .innerJoin(product_label, eq(product_label.productId, product.id))
      .innerJoin(labels, eq(labels.id, product_label.labelId))
      .where(eq(labels.id, filterBy));

    return products;
  }
};

export const getProductByOwnerId = async (ownerId) => {
  let products = await db
    .select()
    .from(product)
    .limit(100)
    .where(eq(product.OwnerId, ownerId));
  for (let i = 0; i < products.length; i++) {
    const { image } = await getProductFirstImage(products[i].id);
    const { name } = await getUserById(products[i].OwnerId);
    products[i] = { ...products[i], image, ownerName: name };
  }
  if (products.length > 0) {
    return products;
  }
  return null;
};

export const getProductById = async (id) => {
  let productData = await db
    .select()
    .from(product)
    .where(eq(product.id, id))
    .limit(1);

  const productImages = await getProductImages(id);
  const { name: ownerName } = await getUserById(productData[0].OwnerId);
  const labels = await getProductLabels(id);

  productData[0] = {
    ...productData[0],
    ownerName,
    labels,
    productImages,
  };
  if (productData.length > 0) {
    return productData[0];
  }
  return null;
};
export const getProductByIdWithoutLabel = async (id) => {
  let productData = await db
    .select()
    .from(product)
    .where(eq(product.id, id))
    .limit(1);
  const labelData = await db
    .select({ label: product_label.labelId })
    .from(product_label)
    .where(eq(product_label.productId, id));
  const label = labelData[0].label;
  const productImages = await getProductImages(id);
  const { name: ownerName } = await getUserById(productData[0].OwnerId);
  productData[0] = {
    ...productData[0],
    label,
    ownerName,
    productImages,
  };
  if (productData.length > 0) {
    return productData[0];
  }
  return null;
};

const getProductLabels = async (productId) => {
  const productLabels = await db
    .select({
      labels: labels.label,
    })
    .from(product_label)
    .where(eq(product_label.productId, productId))
    .rightJoin(labels, eq(labels.id, product_label.labelId));

  if (productLabels) {
    return [...new Set(productLabels.map(({ labels }) => labels))];
  }
  return null;
};

const getProductImages = async (productId) => {
  const productImages = await db
    .select({ image: product_image.image })
    .from(product_image)
    .where(eq(product_image.productId, productId))
    .limit(6);
  let productImageArray = [];
  for (let i = 0; i < productImages.length; i++) {
    productImageArray.push(productImages[i].image);
  }

  return productImageArray;
};

export const getProductFirstImage = async (productId) => {
  const productImage = await db
    .select({ image: product_image.image })
    .from(product_image)
    .where(eq(product_image.productId, productId))
    .limit(1);

  return productImage[0];
};

export const getProductsFromSearch = async (search) => {
  try {
    const searchedProducts = await db
      .select()
      .from(product)
      .where(like(product.name, `${search}%`));
    for (let i = 0; i < searchedProducts.length; i++) {
      const { image } = await getProductFirstImage(searchedProducts[i].id);
      const { name } = await getUserById(searchedProducts[i].OwnerId);
      searchedProducts[i] = { ...searchedProducts[i], image, ownerName: name };
    }
    if (searchedProducts.length > 0) {
      return searchedProducts;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const getProducts = async () => {
  const results = await db
    .select({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      availableQuantity: product.availableQuantity,
      totalLikes: product.totalLikes,
      createdAt: product.createdAt,
      OwnerId: product.OwnerId,
      ownerName: users.name,
      image: product_image.image,
      label: labels.label,
    })
    .from(product)
    .leftJoin(users, eq(product.OwnerId, users.id))
    .leftJoin(product_image, eq(product.id, product_image.productId))
    .leftJoin(product_label, eq(product.id, product_label.productId))
    .leftJoin(labels, eq(product_label.labelId, labels.id))
    .limit(400); // fetch more rows since each product has multiple labels/images

  // group rows by product id
  const grouped = results.reduce((acc, row) => {
    if (!acc[row.id]) {
      acc[row.id] = {
        id: row.id,
        name: row.name,
        price: row.price,
        description: row.description,
        availableQuantity: row.availableQuantity,
        totalLikes: row.totalLikes,
        createdAt: row.createdAt,
        OwnerId: row.OwnerId,
        ownerName: row.ownerName,
        image: row.image ?? null,
        label: row.label ?? null,
      };
    } else {
      if (row.image && !acc[row.id].image) {
        acc[row.id].image = row.image;
      }
    }
    return acc;
  }, {});

  return Object.values(grouped).slice(0, 100);
};
export const insertNewProduct = async (
  productId,
  title,
  description,
  price,
  label,
  totalLike,
  availableQuantity,
  ownerId,
) => {
  try {
    const productData = await db.insert(product).values({
      id: productId,
      name: title,
      description: description,
      price: price,
      totalLikes: totalLike,
      availableQuantity: availableQuantity,
      OwnerId: ownerId,
      createdAt: new Date(),
    });
    const insertLabel = await insertNewLabel(productId, label);
    if (insertLabel === null) {
      return null;
    }
    return productData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const insertNewLabel = async (productID, lableID) => {
  try {
    await db.insert(product_label).values({
      productId: productID,
      labelId: lableID,
    });
    return;
  } catch (error) {
    return null;
  }
};
export const updateLabel = async (productID, labelID) => {
  try {
    await db
      .update(product_label)
      .set({
        productId: productID,
        labelId: parseInt(labelID),
      })
      .where(eq(product_label.productId, productID));
    console.log("Label Updated");
    return;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const insertProductImage = async (productId, imageId) => {
  try {
    await db.insert(product_image).values({
      productId: productId,
      image: imageId,
    });
    return;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProductsLikedByUser = async (userId) => {
  try {
    const products = await db
      .select(product)
      .from(product_userLiked)
      .where(eq(product_userLiked.userId, userId))
      .orderBy(asc(product_userLiked.likedAt))
      .rightJoin(product, eq(product.id, product_userLiked.productId));
    for (var i = 0; i < products.length; i++) {
      const { image } = await getProductFirstImage(products[i].id);
      products[i] = { ...products[i], image };
    }
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getOwnersProduct = async (userId) => {
  try {
    const products = await db
      .select()
      .from(product)
      .where(eq(product.OwnerId, userId));
    if (products.length <= 0 || products === null || products === undefined) {
      return null;
    }
    for (let i = 0; i < products.length; i++) {
      const { image } = await getProductFirstImage(products[i].id);
      const { name } = await getUserById(products[i].OwnerId);
      products[i] = {
        ...products[i],
        image,
        ownerName: name,
      };
    }
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteProduct = async (userId, productId) => {
  try {
    const deleteData = await db
      .delete(product)
      .where(and(eq(product.id, productId), eq(product.OwnerId, userId)));

    if (deleteData[1] === undefined) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteImage = async (productID, imagePath) => {
  try {
    const deleteImageFile = await db
      .delete(product_image)
      .where(
        and(
          eq(product_image.productId, productID),
          eq(product_image.image, imagePath),
        ),
      );
    if (deleteImageFile[0].affectedRows === 0) {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateProduct = async (productId, name, description, price) => {
  try {
    const newProduct = await db
      .update(product)
      .set({ name: name, description: description, price: price })
      .where(eq(product.id, productId));
    if (newProduct[0].affectedRows === 0) {
      return null;
    }
    return;
  } catch (error) {
    console.log(error);
    return null;
  }
};
