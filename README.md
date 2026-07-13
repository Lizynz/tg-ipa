# tg-ipa
Send .ipa files to Telegram with a custom icon preview
### Installation

```bash
git clone https://github.com/Lizynz/tg-ipa.git
cd tg-uploader

npm install
```

### Configuration

Open `index.js` and set your Telegram API credentials:

```js
const apiId = YOUR_API_ID;
const apiHash = "YOUR_API_HASH";
```

For the first launch, leave the session empty:

```js
const stringSession = new StringSession("");
```

After logging in, the session string will be printed to the console. Paste it back into `index.js` to avoid logging in again.

### Usage

Place your files in the project root:

```text
tg-uploader/
├── App.ipa
├── icon.jpg
└── index.js
```

Run:

```bash
node index.js
```
