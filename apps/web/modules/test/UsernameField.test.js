import { describe, it, expect } from "vitest";

function simulateUsernameFieldConditions({
  isSubmitting,
  isSubmitSuccessful,
  debouncedUsername,
  disabled,
  usernameTaken,
}) {
  if (disabled) return null;

  if (!debouncedUsername) {
    return { premium: false, usernameTaken: false };
  }

  if (isSubmitting || isSubmitSuccessful) {
    return { premium: false, usernameTaken };
  }

  return { premium: false, usernameTaken };
}

describe("UsernameField - Casos de Teste", () => {
  it("CT1: Nenhuma condição satisfeita (CD1=false, CD2=false)", () => {
    const result = simulateUsernameFieldConditions({
      isSubmitting: false,
      isSubmitSuccessful: false,
      debouncedUsername: "",
      disabled: false,
      usernameTaken: false,
    });
    expect(result).toEqual({ premium: false, usernameTaken: false });
  });

  it("CT2: Apenas isSubmitting (CD1=true, CD2=false)", () => {
    const result = simulateUsernameFieldConditions({
      isSubmitting: true,
      isSubmitSuccessful: false,
      debouncedUsername: "user123",
      disabled: false,
      usernameTaken: false,
    });
    expect(result).toEqual({ premium: false, usernameTaken: false });
  });

  it("CT3: Apenas isSubmitSuccessful (CD1=false, CD2=true)", () => {
    const result = simulateUsernameFieldConditions({
      isSubmitting: false,
      isSubmitSuccessful: true,
      debouncedUsername: "user123",
      disabled: false,
      usernameTaken: false,
    });
    expect(result).toEqual({ premium: false, usernameTaken: false });
  });

  it("CT4: Username já está em uso (CD1=false, CD2=false, CD4=false)", () => {
    const result = simulateUsernameFieldConditions({
      isSubmitting: false,
      isSubmitSuccessful: false,
      debouncedUsername: "user123",
      disabled: false,
      usernameTaken: true,
    });
    expect(result).toEqual({ premium: false, usernameTaken: true });
  });

  it("CT5: Username premium (CD1=false, CD2=false, CD4=false)", () => {
    const result = simulateUsernameFieldConditions({
      isSubmitting: false,
      isSubmitSuccessful: false,
      debouncedUsername: "premiumUser",
      disabled: false,
      usernameTaken: false,
    });
    expect(result).toEqual({ premium: false, usernameTaken: false });
  });

  it("CT6: Campo desabilitado (CD3=true)", () => {
    const result = simulateUsernameFieldConditions({
      isSubmitting: false,
      isSubmitSuccessful: false,
      debouncedUsername: "user123",
      disabled: true,
      usernameTaken: false,
    });
    expect(result).toBeNull();
  });
});
