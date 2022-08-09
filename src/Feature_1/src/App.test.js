import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";

test("original landing page with default values", async () => {
  render(<Form />);
  //test if the button is rendered
  expect(screen.getByRole("button", { name: "Search for hotels" }));
  const inputNode = screen.getByTestId("rooms").querySelector("input");
  expect(inputNode).toBeInTheDocument();
  expect(inputNode).toHaveValue("1");
  const inputNodeA = screen.getByTestId("adults").querySelector("input");
  expect(inputNodeA).toHaveValue("1");
  const inputNodeB = screen.getByTestId("children").querySelector("input");
  expect(inputNodeB).toHaveValue("0");
});

test("guest edited values", async () => {
  //test if input boxes of guests can accept any other things except for integers
  render(<Form />);
  const inputNode = screen.getByTestId("rooms").querySelector("input");
  userEvent.type(inputNode, "{backspace}");
  userEvent.type(inputNode, "hello");
  expect(inputNode).toHaveValue("");
  const inputNodeA = screen.getByTestId("adults").querySelector("input");
  userEvent.type(inputNodeA, "{backspace}");
  userEvent.type(inputNodeA, "testing");
  expect(inputNodeA).toHaveValue("");
  userEvent.type(
    inputNodeA,
    "The quic\b\b\b\b\b\bk brown fo\u0007\u0007\u0007\u0007\u0007\u0007\u0007\u0007\u0007\u0007\u0007x... [Beeeep]"
  );
  expect(inputNodeA).toHaveValue("");
  const inputNodeB = screen.getByTestId("children").querySelector("input");
  userEvent.type(inputNodeB, "{backspace}");
  userEvent.type(inputNodeB, "@@**");
  expect(inputNodeB).toHaveValue("");
  userEvent.type(inputNodeB, "  ﾟ･✿ヾ╲(｡◕‿◕｡)╱✿･ﾟ  ");
  expect(inputNodeB).toHaveValue("");
  userEvent.type(inputNodeB, "%s%s%s%s%s");
  expect(inputNodeB).toHaveValue("");
  userEvent.click(screen.getByRole("button", { name: "Search for hotels" }));
  expect(screen.getByText("Number of rooms are required!")).toBeInTheDocument();
  expect(
    screen.getByText("Number of adults are required!")
  ).toBeInTheDocument();
});
jest.setTimeout(25000);
test("submit original form without new values", async () => {
  render(<Form />);
  await new Promise((r) => setTimeout(r, 15000));
  userEvent.click(screen.getByRole("button", { name: "Search for hotels" }));
  expect(screen.getByText("Stay period is required!")).toBeInTheDocument();
  expect(screen.getByText("Destination required!")).toBeInTheDocument();
});
jest.setTimeout(25000);
test("submit form with all errors", async () => {
  render(<Form />);
  const inputNode = screen.getByTestId("rooms").querySelector("input");
  userEvent.type(inputNode, "{backspace}");
  userEvent.type(inputNode, "0");
  const inputNodeA = screen.getByTestId("adults").querySelector("input");
  userEvent.type(inputNodeA, "{backspace}");
  userEvent.type(inputNodeA, "0");
  await new Promise((r) => setTimeout(r, 10000));
  userEvent.click(screen.getByRole("button", { name: "Search for hotels" }));
  expect(screen.getByText("Stay period is required!")).toBeInTheDocument();
  expect(screen.getByText("Destination required!")).toBeInTheDocument();
  expect(screen.getByText("At least 1 adult is required!")).toBeInTheDocument();
  expect(screen.getByText("At least 1 room is required!")).toBeInTheDocument();
});

jest.setTimeout(18000);
test("submit invalid destination", async () => {
  render(<Form />);
  await new Promise((r) => setTimeout(r, 9000));
  const inputNode = screen.getByTestId("destinations").querySelector("input");
  userEvent.type(inputNode, "' or 1=1-- -");
  expect(screen.queryByRole("listbox")).toBeNull();
  userEvent.type(
    inputNode,
    '<a href="\\x16javascript:javascript:alert(1)" id="fuzzelement1">test</a>'
  );
  expect(screen.queryByRole("listbox")).toBeNull();
  userEvent.click(screen.getByRole("button", { name: "Search for hotels" }));
  expect(screen.getByText("Destination required!")).toBeInTheDocument();
});
jest.setTimeout(18000);
test("submit valid destinations, test if autocomplete works", async () => {
  render(<Form />);
  await new Promise((r) => setTimeout(r, 10000));
  const inputNode = screen.getByTestId("destinations").querySelector("input");
  userEvent.type(inputNode, "Rome");
  expect(screen.queryByRole("listbox")).not.toBeNull();
  userEvent.type(inputNode, "{backspace}");
  userEvent.type(inputNode, "{backspace}");
  userEvent.type(inputNode, "{backspace}");
  userEvent.type(inputNode, "{backspace}");
  await new Promise((r) => setTimeout(r, 500));
  userEvent.type(inputNode, "Sin");
  expect(screen.queryByRole("listbox")).not.toBeNull();
});
