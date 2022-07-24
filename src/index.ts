import app from "./app";
import { getClass } from "./endpoints/getClass";
import { postClass } from "./endpoints/postClass";
import { postStudents } from "./endpoints/postStudents";
import { postTeacher } from "./endpoints/postTeacher";

//1
app.post("/class", postClass)

//2
app.get("/class", getClass)

//3
app.post("/students", postStudents)

//4
app.post("/teachers", postTeacher)

