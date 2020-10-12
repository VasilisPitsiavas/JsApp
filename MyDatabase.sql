create table if not exists user (
    id int not null primary key AUTO_INCREMENT,
    name varchar(100) not null,
    email varchar(100) not null,
    password varchar(100) not null,

    unique key(email)
);
    
create table if not exists blog (
    id int not null primary key AUTO_INCREMENT,
    user_id int not null,
    name varchar(100),

    foreign key(user_id) references user(id) on delete cascade
);

create table if not exists post (
    id int not null primary key AUTO_INCREMENT,
    blog_id int not null,
    title varchar(255) not null,
    txt text not null,

    foreign key(blog_id) references blog(id) on delete cascade
);

create table if not exists category (
    id int not null primary key AUTO_INCREMENT,
    blog_id int not null,
    name varchar(100),

    foreign key(blog_id) references blog(id) on delete cascade
);

create table if not exists post_category (
    post_id int not null,
    category_id int not null,

    foreign key(post_id) references post(id) on delete cascade,
    foreign key(category_id) references category(id) on delete cascade
);