CREATE TABLE `career_level` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(10) NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `chapter` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `customer` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `job_role` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `language` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `person` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`eid` text(255) NOT NULL,
	`career_level_id` integer NOT NULL,
	`chapter_id` integer NOT NULL,
	`last_customer_id` integer NOT NULL,
	`last_job_role_id` integer NOT NULL,
	`other_information` text(5000),
	`people_lead_eid` text(255),
	`created_at` integer NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`career_level_id`) REFERENCES `career_level`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`chapter_id`) REFERENCES `chapter`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`last_customer_id`) REFERENCES `customer`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`last_job_role_id`) REFERENCES `job_role`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `person_language` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`person_id` integer NOT NULL,
	`language_id` integer NOT NULL,
	`skill_level_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`person_id`) REFERENCES `person`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`language_id`) REFERENCES `language`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`skill_level_id`) REFERENCES `skill_level`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `person_skill` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`person_id` integer NOT NULL,
	`skill_id` integer NOT NULL,
	`skill_level_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`person_id`) REFERENCES `person`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`skill_id`) REFERENCES `skill`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`skill_level_id`) REFERENCES `skill_level`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `person_skill_interest` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`person_id` integer NOT NULL,
	`skill_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`person_id`) REFERENCES `person`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`skill_id`) REFERENCES `skill`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `skill` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`description` text(2048),
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `skill_level` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`description` text(2048),
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `person_eid_unique_index` ON `person` (`eid`);--> statement-breakpoint
CREATE INDEX `person_career_level_id_index` ON `person` (`career_level_id`);--> statement-breakpoint
CREATE INDEX `person_chapter_id_index` ON `person` (`chapter_id`);--> statement-breakpoint
CREATE INDEX `person_customer_id_index` ON `person` (`last_customer_id`);--> statement-breakpoint
CREATE INDEX `person_last_job_role_id_index` ON `person` (`last_job_role_id`);--> statement-breakpoint
CREATE INDEX `person_language_person_id_index` ON `person_language` (`person_id`);--> statement-breakpoint
CREATE INDEX `person_language_language_id_index` ON `person_language` (`language_id`);--> statement-breakpoint
CREATE INDEX `person_language_skill_level_id_index` ON `person_language` (`skill_level_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `person_language_unique_index` ON `person_language` (`person_id`,`language_id`);--> statement-breakpoint
CREATE INDEX `person_skill_person_id_index` ON `person_skill` (`person_id`);--> statement-breakpoint
CREATE INDEX `person_skill_skill_id_index` ON `person_skill` (`skill_id`);--> statement-breakpoint
CREATE INDEX `person_skill_skill_level_id_index` ON `person_skill` (`skill_level_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `person_skill_unique_index` ON `person_skill` (`person_id`,`skill_id`);--> statement-breakpoint
CREATE INDEX `person_skill_interest_person_id_index` ON `person_skill_interest` (`person_id`);--> statement-breakpoint
CREATE INDEX `person_skill_interest_skill_id_index` ON `person_skill_interest` (`skill_id`);