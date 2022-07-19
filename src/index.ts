import app from "./app";
import { postClass } from "./endpoints/postClass";

//1
app.post("/class", postClass)
