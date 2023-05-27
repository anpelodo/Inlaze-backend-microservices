import { log } from "logger";

import { createServer } from "./server";

(async () => {
  const server = await createServer();
  const port = server.get("port");

  server.listen(port, () => {
    log(`api running on ${port}`);
  });
})();
