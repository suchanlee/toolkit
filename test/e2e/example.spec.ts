import * as electronPath from "electron";
import * as path from "path";
import { Application } from "spectron";

jest.setTimeout(10000);

describe("Main window", () => {
  let app: Application;

  beforeEach(() => {
    app = new Application({
      path: electronPath.toString(),
      args: [path.join(__dirname, "..", "..")]
    });

    return app.start();
  });

  afterEach(() => {
    if (app.isRunning()) {
      app.stop();
    }
  });

  it("increments the counter", async () => {
    const { client } = app;

    await client.waitUntilWindowLoaded();
    await client.click("#increment");

    const counterText = await client.getText("#counter-value");

    expect(counterText).toBe("Current value: 1");
  });

  it("decrements the counter", async () => {
    const { client } = app;

    await client.waitUntilWindowLoaded();
    await client.click("#decrement");

    const counterText = await client.getText("#counter-value");

    expect(counterText).toBe("Current value: -1");
  });
});
