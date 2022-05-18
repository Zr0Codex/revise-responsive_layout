const express = require("express");
const app = express();
const port = 8085;

const bodyParser = require("body-parser");

const doctype = require("./doctype.json");
const docstatus = require("./docstatus.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const { v1: uuidv1, v4: uuidv4 } = require("uuid");

app.post("/login", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  var user_name = req.body.username;
  var password = req.body.password;
  console.log("User name = " + user_name + ", password is " + password);
  if (user_name === "admin" && password === "admin@123") {
    res.write(
      JSON.stringify({
        token: uuidv4(),
        employee_id: 8986565,
        firstName: "ต้นตระการ",
        lastName: "ก็มันง่วงอ่ะ",
        group_code: "เจ้าหน้าที่คลัง",
        group_menu: [
          {
            menu: "MWH1002",
            // menu_wording: "ค้นหากล่องเอกสาร (สำหรับเจ้าหน้าที่งานคลัง)",
            add: 1,
            edit: 1,
            view: 1,
            delete: 1,
          },
          {
            menu: "MWH1007",
            add: 1,
            edit: 1,
            view: 1,
            delete: 1,
          },
          {
            menu: "MWH3001",
            add: 1,
            edit: 1,
            view: 1,
            delete: 1,
          },
          {
            menu: "MWH3002",
            add: 1,
            edit: 1,
            view: 1,
            delete: 1,
          },
        ],
      })
    );
  } else {
    res.write(
      JSON.stringify({
        username: user_name,
        firstName: "user",
        lastName: "role",
        role: "เบิกเอกสาร",
        userId: "2901275",
        token: uuidv4(),
        user_role: "user",
      })
    );
  }
  res.end();
});

app.get("/get-doctype", (req, res) => {
  var data = JSON.stringify(doctype);
  res.send(data);
});

app.get("/get-docstatus", (req, res) => {
  var data = JSON.stringify(docstatus);
  res.send(data);
});

// app.get("/menu-doctype", function (req, res) {
//   const menu_doctype = [
//     {
//       menu: "มณ/บอกล้าง/ปฏิเสธ",
//       key: "01",
//     },
//     {
//       menu: "ค่าทดแทน",
//       key: "02",
//     },
//     {
//       menu: "ให้สิทธิ์/เบี้ยเลี้ยงชีพ/ทร.",
//       key: "03",
//     },
//     {
//       menu: "ร้องเรียน",
//       key: "04",
//     },
//     {
//       menu: "เอกสารวางบิล (งาน faxclaim)",
//       key: "05",
//     },
//     {
//       menu: "ใบเสร็จรับงิน",
//       key: "06",
//     },
//     {
//       menu: "อื่น ๆ ",
//       key: "07",
//     },
//     {
//       menu: "รอเข้ากองทุน",
//       key: "08",
//     },
//     {
//       menu: "ใบเหลือง",
//       key: "09",
//     },
//     {
//       menu: "เอกสารแนบเพิ่มเติม!",
//       key: "10",
//     },
//   ];

//   res.write(menu_doctype);

//   res.end();
// });

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
