create table users (
  id_users serial primary key,
  name varchar(100) not null,
  email varchar(100) not null unique,
  password varchar(255) not null,
  phone varchar(15) not null, 
  birthdate date not null,
  created_at timestamp default current_timestamp
);

insert into users (name, email, password, phone, birthdate) values
('John Doe', 'jhon@gmail.com', 'password123', '1234567890', '1990-01-01'),
('Jane Smith', 'jane@gmail.com', 'password456', '0987654321', '1992-02-02');

select * from users;