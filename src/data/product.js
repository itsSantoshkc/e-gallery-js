import { product, product_userLiked } from "./../schema/ProductSchema";
import { db } from "@/db/db";
import { labels, product_image, product_label } from "@/schema/ProductSchema";
import { and, asc, eq, like, sql } from "drizzle-orm";
import { getUserById, getUserLikedProductsLabel } from "./user";
import EdgeRank from "@/helper/EdgeRank";

export const getPersonalizeProductsByUserId = async (
  userId,
  filterBy,
  sortBy
) => {
  const userLikedLabels = await getUserLikedProductsLabel(userId);

  const products = await getProductDataWithLabels(filterBy, sortBy);

  if (userLikedLabels?.length <= 0) {
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
  }
  const edgeRank = new EdgeRank(userLikedLabels, products);
  const personalizedProduct = await edgeRank.getEdgeValue();
  for (let i = 0; i < (await personalizedProduct.length); i++) {
    const { image } = await getProductFirstImage(personalizedProduct[i].id);
    const { name } = await getUserById(personalizedProduct[i].OwnerId);
    personalizedProduct[i] = {
      ...personalizedProduct[i],
      image,
      ownerName: name,
    };
  }
  if ((await personalizedProduct.length) > 0) {
    return personalizedProduct;
  }
  return null;
};

const getProductDataWithLabels = async (filterBy, sortBy) => {
  console.log(filterBy, sortBy);
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
  let products = await db.select().from(product).limit(100);
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

export const insertNewProduct = async (
  productId,
  title,
  description,
  price,
  label,
  totalLike,
  availableQuantity,
  ownerId
) => {
  try {
    await db.insert(product).values({
      id: productId,
      name: title,
      description: description,
      price: price,
      totalLikes: totalLike,
      availableQuantity: availableQuantity,
      OwnerId: ownerId,
      createdAt: new Date(),
    });
    console.log("Owner id :", ownerId);
    const insertLabel = await insertNewLabel(productId, label);
    console.log("Inserting label", insertLabel);
    if (insertLabel === null) {
      return null;
    }
    return;
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
          eq(product_image.image, imagePath)
        )
      );
    if (deleteImageFile[0].affectedRows === 0) {
      return null;
    }
    console.log(deleteImageFile);
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
