import { render, waitFor } from "@testing-library/react";
import React from "react";
import { useFormContext } from "react-hook-form";

import UsernameField from "../path/to/UsernameField";
import { fetchUsername } from "../path/to/api";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(),
}));
jest.mock("../path/to/api", () => ({
  fetchUsername: jest.fn(),
}));

describe("UsernameField Component", () => {
  const setPremiumMock = jest.fn();
  const setUsernameTakenMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useFormContext.mockReturnValue({
      formState: { isSubmitting: false, isSubmitSuccessful: false },
      register: jest.fn(),
    });
  });

  test("não faz nada quando formState.isSubmitting ou formState.isSubmitSuccessful são verdadeiros", () => {
    useFormContext.mockReturnValue({
      formState: { isSubmitting: true, isSubmitSuccessful: false },
      register: jest.fn(),
    });

    render(
      <UsernameField
        username=""
        setPremium={setPremiumMock}
        premium={false}
        usernameTaken={false}
        setUsernameTaken={setUsernameTakenMock}
        disabled={false}
      />
    );

    expect(fetchUsername).not.toHaveBeenCalled();
  });

  test("não chama fetchUsername quando disabled é verdadeiro", () => {
    render(
      <UsernameField
        username="testUser"
        setPremium={setPremiumMock}
        premium={false}
        usernameTaken={false}
        setUsernameTaken={setUsernameTakenMock}
        disabled={true}
      />
    );

    expect(fetchUsername).not.toHaveBeenCalled();
  });

  test("chama fetchUsername com debouncedUsername válido", async () => {
    fetchUsername.mockResolvedValue({ data: { premium: true, available: false } });

    render(
      <UsernameField
        username="validUser"
        setPremium={setPremiumMock}
        premium={false}
        usernameTaken={false}
        setUsernameTaken={setUsernameTakenMock}
        disabled={false}
      />
    );

    await waitFor(() => {
      expect(fetchUsername).toHaveBeenCalledWith("validUser", null);
    });

    expect(setPremiumMock).toHaveBeenCalledWith(true);
    expect(setUsernameTakenMock).toHaveBeenCalledWith(true);
  });

  test("reseta premium e usernameTaken quando username está vazio", async () => {
    render(
      <UsernameField
        username=""
        setPremium={setPremiumMock}
        premium={true}
        usernameTaken={true}
        setUsernameTaken={setUsernameTakenMock}
        disabled={false}
      />
    );

    await waitFor(() => {
      expect(setPremiumMock).toHaveBeenCalledWith(false);
      expect(setUsernameTakenMock).toHaveBeenCalledWith(false);
    });
  });
});
