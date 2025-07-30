import React from "react";
import "whatwg-fetch";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "../mocks/server";

import App from "../components/App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays question prompts after fetching", async () => {
  render(<App />);

  fireEvent.click(screen.getByText(/View Questions/));

  expect(await screen.findByText(/lorem testum 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/i)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);

  // Wait for initial questions to load
  await screen.findByText(/lorem testum 1/i);

  // Go to form page
  fireEvent.click(screen.getByText("New Question"));

  // Fill form
  fireEvent.change(screen.getByLabelText(/Prompt/i), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), {
    target: { value: "Test Answer 1" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), {
    target: { value: "Test Answer 2" },
  });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), {
    target: { value: "1" },
  });

  // Submit form
  fireEvent.click(screen.getByText(/Add Question/i));

  // Go back to view list
  fireEvent.click(screen.getByText(/View Questions/i));

  expect(await screen.findByText(/Test Prompt/i)).toBeInTheDocument();
  expect(screen.getByText(/lorem testum 1/i)).toBeInTheDocument();
});

test("deletes the question when the delete button is clicked", async () => {
  render(<App />);

  fireEvent.click(screen.getByText(/View Questions/));

  await screen.findByText(/lorem testum 1/i);

  fireEvent.click(screen.getAllByText("Delete Question")[0]);

  await waitForElementToBeRemoved(() => screen.queryByText(/lorem testum 1/i));

  // Make sure another question still remains
  expect(await screen.findByText(/lorem testum 2/i)).toBeInTheDocument();
  expect(screen.queryByText(/lorem testum 1/i)).not.toBeInTheDocument();
});

test("updates the answer when the dropdown is changed", async () => {
  render(<App />);

  fireEvent.click(screen.getByText(/View Questions/));

  await screen.findByText(/lorem testum 2/i);

  // Change correct answer index for the first question
  fireEvent.change(screen.getAllByLabelText(/Correct Answer/i)[0], {
    target: { value: "3" },
  });

  // Wait for the DOM to reflect the updated value
  await waitFor(() => {
    expect(screen.getAllByLabelText(/Correct Answer/i)[0].value).toBe("3");
  });
});
