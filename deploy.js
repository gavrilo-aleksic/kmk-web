import { Client } from "node-scp";

const connectionSettings = {
  host: "51.75.72.23",
  port: 22,
  username: "root",
  password: process.argv[2],
};
const copyFrom = "./";
const copyTo = "/root/kmk/web";

const transferDir = async (copyFrom, copyTo) => {
  Client(connectionSettings)
    .then((client) => {
      console.log("Starting Upload...");
      client
        .uploadDir(copyFrom, copyTo)
        .then((response) => {
          client.close();
          console.log("Transfer finished");
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((e) => console.error(e));
};

await transferDir(copyFrom, copyTo);
