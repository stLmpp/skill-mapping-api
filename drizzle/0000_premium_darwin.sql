CREATE TABLE `person` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pid` text(30),
	`other_information` text(5000),
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `person_skill` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`person_id` integer,
	`skill_id` integer,
	`skill_level_int` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`person_id`) REFERENCES `person`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`skill_id`) REFERENCES `skill`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`skill_level_int`) REFERENCES `skill_level`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `skill` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `skill_level` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255),
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `person_pid_unique` ON `person` (`pid`);--> statement-breakpoint
CREATE INDEX `person_id_index` ON `person_skill` (`person_id`);--> statement-breakpoint
CREATE INDEX `skill_id_index` ON `person_skill` (`skill_id`);--> statement-breakpoint
CREATE INDEX `skill_level_id_index` ON `person_skill` (`skill_level_int`);