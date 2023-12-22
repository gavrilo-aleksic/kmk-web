import SftpUpload from "sftp-upload";

const options = {
    path: "./",
    remoteDir: "/root/kmk/web",
    excludedFolders: ["**/.git", "node_modules", "dist"],
    exclude: [".gitignore", ".vscode/tasks.json"],
    host: "51.75.72.23",
    port: 22,
    username: "root",
    password: process.argv[2],
    dryRun: false,
  },
  sftp = new SftpUpload(options);

sftp
  .on("error", function (err) {
    throw err;
  })
  .on("uploading", function (progress) {
    console.log("Uploading", progress.file);
    console.log(progress.percent + "% completed");
  })
  .on("completed", function () {
    console.log("Upload Completed");
  })

  .upload();
