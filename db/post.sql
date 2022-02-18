create table `post` (
    `post_id` integer not null primary key,
    `title` text not null,
    `created_on` integer not null,
    `updated_on` integer not null,
    `published_on` integer,
    `created_by` integer not null,
    foreign key (`created_by`) references `user`(`user_id`)
);