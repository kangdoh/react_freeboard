require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const cors = require("cors");
const boardRoutes = require("./routes/freeboardRoutes");

const { sequelize } = require("./models");

const app = express();

app.set("port", process.env.PORT || 5000);
app.set("view engine", "html");

// nunjucks 템플릿 설정
nunjucks.configure("views", {
  express: app,
  watch: true, 
});

// (테이블 새로 생성)force: false ⇆ (기존 테이블을 유지하며 추가)alter: true
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/boards", boardRoutes);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  console.log(`err.message = ${err.message}`);
  console.log(`err = ${err}`);
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.json({
    message: err.message,
    err: err,
    status: 500,
  });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
