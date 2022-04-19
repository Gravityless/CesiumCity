drop table if exists tb_polygon;

create table tb_polygon
(
    id int primary key auto_increment,
    polygon_name varchar(40),
    location varchar(40),
    margins varchar(800),
    description varchar(400),
    status int
);

insert into tb_polygon(polygon_name, location, margins, description, status)
values ('polygon1', 'lontitude:xxx, latitude:xxx', '[{ x: -2733784.1592402603, y: 5093059.6151296245, z: 2686846.8706877907 }, { x: -2733781.032101405, y: 5093114.680154704, z: 2686746.3488108856 },{ x: -2733924.19395856, y: 5093041.994435746, z: 2686738.5149721224 },{ x: -2733881.373544848, y: 5093012.381819005, z: 2686837.5519579444 }]','Description...',0);

SELECT *FROM tb_polygon;
