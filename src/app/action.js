"use server";

import { db } from "@/db/db";
import { labels } from "@/schema/ProductSchema";

export const getLabels = async () => {
  try {



const responseData = await db.select().from(labels);
    if (responseData.length !== 0) {
      return responseData;
    }
    return null;
  } catch (error) {
    return null;
  }
};
