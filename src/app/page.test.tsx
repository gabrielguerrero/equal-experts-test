import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { setupServer } from "msw/node";
import { handlers } from "equal-experts/app/mocks/msw-handlers";
import { cleanup, render, screen } from "equal-experts/app/util/test-render";
import Home from "equal-experts/app/page";
import { userEvent } from "@testing-library/user-event";

describe("AppRouter", () => {
  const server = setupServer(...handlers);
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });

  afterAll(() => {
    server.close();
  });

  test("should render the groceries", async () => {
    await render(<Home />);
    expect(await screen.findByText("Bananas")).toBeDefined();
    expect(await screen.findByText("Oranges")).toBeDefined();
    expect(await screen.findByText("Fish")).toBeDefined();
  });

  test("should add groceries", async () => {
    await render(<Home />);
    await screen.findByText("Bananas");
    await userEvent.type(
      screen.getByPlaceholderText("Add new grocery"),
      "Cookies",
    );
    await userEvent.click(screen.getByText("Add"));
    expect(await screen.findByText("Cookies")).toBeDefined();
  });
  test("should update groceries text", async () => {
    await render(<Home />);
    await screen.findByText("Oranges");
    await userEvent.click(await screen.findByText("Oranges"));
    await userEvent.clear(screen.getByPlaceholderText("Update grocery"));
    await userEvent.type(
      screen.getByPlaceholderText("Update grocery"),
      "Salad",
    );
    await userEvent.keyboard("{enter}");
    expect(await screen.findByText("Salad")).toBeDefined();
  });
  test("should update groceries done status", async () => {
    await render(<Home />);
    await screen.findByText("Bananas");
    await userEvent.click(await screen.findByText("Bananas"));
    let checkboxes = await screen.findAllByLabelText("Done Checkbox");
    await userEvent.click(checkboxes[1]!);
    checkboxes = await screen.findAllByLabelText("Done Checkbox");
    expect((checkboxes[1] as HTMLInputElement).checked).toBeTruthy();
  });
});
