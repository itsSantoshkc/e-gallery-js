"use client";
import React from "react";
import RecentOrder from "./RecentOrder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentLikes from "./RecentLikes";
import { useSession } from "next-auth/react";

const Page = (props) => {
  const { data: session, status } = useSession();

  if (session === undefined || status === "loading") {
    return (
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        <div className="loader "></div>
      </div>
    );
  }

  const userId = session.user.id;
  return (
    <>
      <div className="flex justify-center min-h-screen max-w-screen">
        <Tabs defaultValue="recent-orders" className="w-full pt-12 ">
          <TabsList className="flex justify-center bg-white">
            <TabsTrigger
              value="recent-orders"
              className="font-semibold data-[state=active]:text-white data-[state=active]:bg-stone-500"
            >
              Recent Orders
            </TabsTrigger>
            <TabsTrigger
              value="recent-likes"
              className="font-semibold data-[state=active]:text-white data-[state=active]:bg-stone-500"
            >
              Recent Likes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="recent-orders" className="w-full">
            <RecentOrder userId={userId} />
          </TabsContent>
          <TabsContent value="recent-likes">
            <RecentLikes userId={userId} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
