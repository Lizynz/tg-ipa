const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const fs = require("fs");

const apiId = ;
const apiHash = "";

// Paste the session here after the first login.
const stringSession = new StringSession("");

(async () => {
    // Find the first IPA file.
  const ipaFile = fs
    .readdirSync("./")
    .find((f) => f.toLowerCase().endsWith(".ipa"));

  if (!ipaFile) {
    console.log("IPA file not found");
    return;
  }

    // Find the thumbnail.
  const thumbFile = fs
    .readdirSync("./")
    .find((f) => {
      const lower = f.toLowerCase();
      return (
        lower.endsWith(".jpg") ||
        lower.endsWith(".jpeg") ||
        lower.endsWith(".png")
      );
    });

  console.log("IPA:", ipaFile);

  if (thumbFile) {
    console.log("Thumbnail:", thumbFile);
  } else {
    console.log("Thumbnail not found");
  }

  const client = new TelegramClient(
    stringSession,
    apiId,
    apiHash,
    {
      connectionRetries: 5,
    }
  );

  await client.start({
    phoneNumber: async () => await input.text("Phone: "),
    password: async () => await input.text("2FA Password: "),
    phoneCode: async () => await input.text("Code: "),
    onError: console.log,
  });

    // Save the session.
  console.log("SESSION:");
  console.log(client.session.save());

  console.log("Logged in");
    
    let lastProgress = -1;
    
    // Upload the IPA to your Saved Messages ("me").
    await client.sendFile("me", {
      file: `./${ipaFile}`,
      thumb: thumbFile ? `./${thumbFile}` : undefined,
      forceDocument: true,
      caption: ipaFile,
      workers: 16,

      attributes: [
        new Api.DocumentAttributeFilename({
          fileName: ipaFile,
        }),

        new Api.DocumentAttributeVideo({
          roundMessage: false,
          supportsStreaming: false,
          duration: 0,
          w: 150,
          h: 150,
        }),
      ],

        progressCallback: (p) => {
          const percent = Math.round(p * 100);

          if (percent !== lastProgress) {
            lastProgress = percent;
            process.stdout.write(`\rUpload: ${percent}%`);
          }
        },
    });

  console.log("Done");
})();
