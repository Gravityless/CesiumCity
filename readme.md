## CesiumCity

### 目录结构

* src/main/webapp: 前端代码
* src/main/java: 后端代码
* src/main/webapp/data/3dtiles: 3DTiles数据集
* src/main/webapp/data/database: 数据库脚本

### 注意事项

1. 目录结构可以经讨论后增改；
2. 前端采用VUE框架和AJAX技术向后端请求数据；
3. 把对数据库的增改放到database文件夹中，用于管理数据；
4. 每次push之前先pull同步进度；
5. 可以创建dev等其他分支；