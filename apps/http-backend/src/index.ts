import { initServer } from "./app";
import * as dotenv from "dotenv"
dotenv.config();
const PORT=8000;
async function init(){
  const app=await initServer();

  app.listen(PORT,()=>console.log(`server started at PORT: ${PORT}`));
}
init();