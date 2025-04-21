import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import BookingForm from "./components/BookingForm";

// Mock props
const mockDispatch = jest.fn();
const mockSubmitForm = jest.fn();

const defaultProps = {
  availableTimes: {
    availableTimes: ["17:00", "18:00", "19:00"],
  },
  dispatch: mockDispatch,
  SubmitForm: mockSubmitForm,
};

describe("BookingForm", () => {
  beforeEach(() => {
    render(<BookingForm {...defaultProps} />);
  });

  it("renders the booking form with initial fields", () => {
    expect(screen.getByLabelText("Choose Date:")).toBeInTheDocument();
    expect(screen.getByLabelText("Choose Time:")).toBeInTheDocument();
    expect(screen.getByLabelText("Number of guests:")).toBeInTheDocument();
    expect(screen.getByLabelText("Occasion:")).toBeInTheDocument();
    expect(screen.getByTestId("reservation-submit-button")).toBeDisabled();
  });

  it("validates required fields", () => {
    fireEvent.click(screen.getByTestId("reservation-submit-button"));

    expect(screen.getByText("Date is required")).toBeInTheDocument();
    expect(screen.getByText("Time is required")).toBeInTheDocument();
    expect(
      screen.getByText("Number of guests is required"),
    ).toBeInTheDocument();
  });

  it("enables submit button with valid inputs", () => {
    const dateInput = screen.getByLabelText("Choose Date:");
    const timeSelect = screen.getByLabelText("Choose Time:");
    const guestsInput = screen.getByLabelText("Number of guests:");

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // tomorrow
    const futureDateStr = futureDate.toISOString().split("T")[0];

    fireEvent.change(dateInput, { target: { value: futureDateStr } });
    fireEvent.change(timeSelect, { target: { value: "17:00" } });
    fireEvent.change(guestsInput, { target: { value: "2" } });

    expect(screen.getByTestId("reservation-submit-button")).toBeEnabled();
  });

  it("shows error when selecting past date", async () => {
    const dateInput = screen.getByLabelText("Choose Date:");
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1); // yesterday
    const pastDateStr = pastDate.toISOString().split("T")[0];

    fireEvent.change(dateInput, { target: { value: pastDateStr } });

    expect(
      await screen.findByText("Date cannot be in the past"),
    ).toBeInTheDocument();
  });

  it("submits form with valid data", () => {
    const dateInput = screen.getByLabelText("Choose Date:");
    const timeSelect = screen.getByLabelText("Choose Time:");
    const guestsInput = screen.getByLabelText("Number of guests:");

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateStr = futureDate.toISOString().split("T")[0];

    fireEvent.change(dateInput, { target: { value: futureDateStr } });
    fireEvent.change(timeSelect, { target: { value: "18:00" } });
    fireEvent.change(guestsInput, { target: { value: "3" } });

    const submitBtn = screen.getByTestId("reservation-submit-button");
    expect(submitBtn).toBeEnabled();

    fireEvent.click(submitBtn);

    expect(mockSubmitForm).toHaveBeenCalled();
  });
});
