ALTER TABLE `product_label` MODIFY COLUMN `labelId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `product_label` ADD PRIMARY KEY(`productId`,`labelId`);