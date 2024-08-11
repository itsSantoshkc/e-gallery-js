import { product } from "./../schema/ProductSchema";
import { labels } from "@/schema/ProductSchema";
import { db } from "@/db/db";

import { eq } from "drizzle-orm";

export default class EdgeRank {
  edges;
  userLikedLabels;
  userLikedLabelsMap;

  constructor(userLikedLabels, products) {
    this.userLikedLabels = userLikedLabels ?? null;
    this.edges = products;
  }

  generateUserLikedLabelMap = () => {
    if (this.userLikedLabels) {
      if (this.userLikedLabels !== null) {
        this.userLikedLabels.map((label) => {
          if (!this.userLikedLabelsMap.get(label)) {
            this.userLikedLabelsMap.set(label, 1);
          }
        });
      }
    }
    return 0;
  };

  calculateUserLikedPoints = (product) => {
    let SimilarPost = 0;
    if (this.userLikedLabelsMap.get(product.label)) {
      SimilarPost = SimilarPost + 1;
      return { ...product, SimilarPost };
    }
    return { ...product, SimilarPost };
    // if (this.userLikedLabels) {
    //   const userLikedLabelMap = new Map();
    //   this.userLikedLabels.map((label: string) => {
    //     if (!userLikedLabelMap.get(label)) {
    //       userLikedLabelMap.set(label, 1);
    //     }
    //   });
    // }
    // return 0;
  };

  // getUserLikePostLabels = async (userId: string | null) => {
  //   try {
  //     this.userLikedLables;
  //   } catch (error: any) {
  //     this.userLikedLables = [""];
  //   }
  // };

  calculateAffinityScore = (product) => {
    let affinityScore = 0;
    const productData = product;
    const affinityScorePoints = {
      likes: 6,
      SimilarPost: 4,
      TotalOwnersPostLikes: 2,
    };
    affinityScore +=
      productData.totalLikes * affinityScorePoints.likes +
      productData.SimilarPost * affinityScorePoints.SimilarPost++;
    // productData.TotalOwnersPostLikes * affinityScorePoints.TotalOwnersPostLikes;

    return affinityScore;
  };
  calculateWeights = (product) => {
    let weight = 0;
    const weightScorePoint = {
      likes: 0.9,
      SimilarPost: 0.5,
      TotalOwnersPostLikes: 0.2,
    };

    weight +=
      product.totalLikes * weightScorePoint.likes +
      product.SimilarPost * weightScorePoint.SimilarPost++;
    // product.TotalOwnersPostLikes * weightScorePoint.TotalOwnersPostLikes;

    return weight;
  };
  calculateTimeDecay = (createdAt) => {
    const initialValue = 100;
    const decayRate = 0.001; //0.001% decay per day

    const elapsedTime = this.getTimeDifferenceInDay(createdAt);
    return initialValue * Math.exp(-decayRate * elapsedTime);
  };

  getTimeDifferenceInDay = (date) => {
    const date1 = new Date(date);
    const date2 = new Date();

    const time_difference = date2.getTime() - date1.getTime();

    //calculate days difference by dividing total milliseconds in a day
    var result = time_difference / (1000 * 60 * 60 * 24);
    return Math.floor(parseInt(result.toFixed(4)));
  };

  calculateEdgeRank = (edge) => {
    const affinity = this.calculateAffinityScore(edge);
    const weight = this.calculateWeights(edge);
    const timeDecay = this.calculateTimeDecay(
      new Date(edge.createdAt).toUTCString()
    );
    return parseFloat(((affinity * weight * timeDecay) / 100000000).toFixed(5));
  };

  getDataInformationWithEdgeValue = () => {
    this.generateUserLikedLabelMap();
    this.edges = this.edges.map((edge) => {
      const edgeWithSimilarPost = this.calculateUserLikedPoints(edge);

      const edgeValue = this.calculateEdgeRank(edgeWithSimilarPost);
      const newEdge = { edgeValue: edgeValue, ...edge };
      return newEdge;
    });
  };

  sortDataWithEdgeRank = () => {
    this.getDataInformationWithEdgeValue();

    this.edges.sort((a, b) => {
      return a.edgeValue !== undefined && b.edgeValue !== undefined
        ? b.edgeValue - a.edgeValue
        : a.productId - b.productId;
    });
  };

  getEdgeValue = async () => {
    this.sortDataWithEdgeRank();
    return this.edges;
  };
}
