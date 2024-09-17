CREATE TABLE `order` (
	`id` varchar(255) NOT NULL,
	`orderedBy` varchar(255) NOT NULL,
	`orderedAt` datetime,
	`orderedTotalAmount` varchar(255),
	CONSTRAINT `order_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_product` (
	`order_id` varchar(255) NOT NULL,
	`product_id` varchar(255) NOT NULL,
	`ordered_quantity` int,
	CONSTRAINT `order_product_order_id_product_id_pk` PRIMARY KEY(`order_id`,`product_id`)
);
--> statement-breakpoint
ALTER TABLE `order` ADD CONSTRAINT `order_orderedBy_user_id_fk` FOREIGN KEY (`orderedBy`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_product` ADD CONSTRAINT `order_product_order_id_order_id_fk` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE cascade ON UPDATE no action;