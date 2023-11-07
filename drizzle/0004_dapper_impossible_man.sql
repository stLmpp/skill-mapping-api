CREATE TABLE `language` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`created_at` integer NOT NULL
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
CREATE INDEX `person_language_person_id_index` ON `person_language` (`person_id`);--> statement-breakpoint
CREATE INDEX `person_language_language_id_index` ON `person_language` (`language_id`);--> statement-breakpoint
CREATE INDEX `person_language_skill_level_id_index` ON `person_language` (`skill_level_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `person_language_unique_index` ON `person_language` (`person_id`,`language_id`);