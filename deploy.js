import scp from "node-scp";

const connectionSettings = {
  host: "51.75.72.23",
  port: 22,
  username: "ratko",
  password: "kmk",
};

const copyFrom = "./";
const copyTo = "/kmk/web";

const send_folder_using_promise = (copyFrom, copyTo) => {
  scp(connectionSettings)
    .then((client) => {
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

send_folder_using_promise(copyFrom, copyTo);
