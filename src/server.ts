import mongoose from "mongoose";
import { app } from "./app";
import config from "./config/index";
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("DB Connected on Successfully");
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
main().catch((err) => console.log(err));
