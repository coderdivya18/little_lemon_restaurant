import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import BookingForm from "./components/BookingForm";

describe("BookingForm Component", () => {
  const mockSubmitForm = jest.fn();
  const mockDispatch = jest.fn();
  const availableTimes = ["12:00 PM", "1:00 PM", "2:00 PM"];

  const setup = () =>
    render(
      <BookingForm
        SubmitForm={mockSubmitForm}
        dispatch={mockDispatch}
        availableTimes={availableTimes}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    setup();
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByTestId("reservation-submit-button")).toBeInTheDocument();
  });

  it("allows date input and calls dispatch on change", () => {
    setup();
    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: "2023-10-20" } });
    expect(dateInput.value).toBe("2023-10-20");
    // Verify dispatch is called with the correct action type and payload
    expect(mockDispatch).toHaveBeenCalledWith("2023-10-20");
  });

  it("allows time selection from available times", () => {
    setup();
    const timeSelect = screen.getByLabelText(/Choose time/i);
    fireEvent.change(timeSelect, { target: { value: "1:00 PM" } });
    expect(timeSelect.value).toBe("1:00 PM");
  });

  it("allows guest input and updates its state", () => {
    setup();
    const guestInput = screen.getByLabelText(/Number of guests/i);
    fireEvent.change(guestInput, { target: { value: "5" } });
    expect(guestInput.value).toBe("5");
  });

  it("sets default occasion to 'Birthday' and updates it on change", () => {
    setup();
    const occasionSelect = screen.getByLabelText(/Occasion/i);
    expect(occasionSelect.value).toBe("Birthday");
    fireEvent.change(occasionSelect, { target: { value: "Anniversary" } });
    expect(occasionSelect.value).toBe("Anniversary");
  });

  it("submits form with correct data and resets form fields after successful submit", () => {
    setup();

    // Fill out the form
    const dateInput = screen.getByLabelText(/Choose date/i);
    const timeSelect = screen.getByLabelText(/Choose time/i);
    const guestInput = screen.getByLabelText(/Number of guests/i);
    const occasionSelect = screen.getByLabelText(/Occasion/i);
    const submitButton = screen.getByTestId("reservation-submit-button");

    fireEvent.change(dateInput, { target: { value: "2023-10-20" } });
    fireEvent.change(timeSelect, { target: { value: "2:00 PM" } });
    fireEvent.change(guestInput, { target: { value: "4" } });
    fireEvent.change(occasionSelect, { target: { value: "Engagement" } });

    // Submit the form
    fireEvent.click(submitButton);

    // Verify form submission
    expect(mockSubmitForm).toHaveBeenCalledWith({
      date: "2023-10-20",
      time: "2:00 PM",
      guests: "4",
      occasion: "Engagement",
    });

    // Verify form reset (assumes all fields reset to default values)
    // Note: You should verify the actual reset behavior of your component
    expect(dateInput.value).toBe("");
    expect(timeSelect.value).toBe("");
    expect(guestInput.value).toBe("");
    expect(occasionSelect.value).toBe("Birthday");
  });
});
