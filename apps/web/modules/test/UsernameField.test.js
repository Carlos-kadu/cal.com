import { describe, it, expect } from "vitest";

function simulateUsernameFieldConditions({ isSubmitting, isSubmitSuccessful, debouncedUsername, disabled }) {
  if (disabled) return true;

  if (!debouncedUsername) return true;

  if (isSubmitting || isSubmitSuccessful) {
    return true;
  }

  return false;
}

describe("UsernameField - Casos de Teste", () => {
  it("CT1: Nenhuma condição satisfeita (CD1=false, CD2=false)", () => {
    const result = simulateUsernameFieldConditions({
      isSubmitting: false,
      isSubmitSuccessful: false,
      debouncedUsername: "user123",
      disabled: false,
    });
    expect(result).toBe(false);
  });

  it("CT2: Apenas isSubmitting (CD1=true, CD2=false)", () => {
    const result = simulateUsernameFieldConditions({
      isSubmitting: true,
      isSubmitSuccessful: false,
      debouncedUsername: "user123",
      disabled: false,
    });
    expect(result).toBe(true);
  });

  it("CT3: Apenas isSubmitSuccessful (CD1=false, CD2=true)", () => {
    const result = simulateUsernameFieldConditions({
      isSubmitting: false,
      isSubmitSuccessful: true,
      debouncedUsername: "user123",
      disabled: false,
    });
    expect(result).toBe(true);
  });

  it("CT4: Campo desabilitado (CD1=false, CD2=false, CD3=true, CD4=“valor”)", () => {
    const result = simulateUsernameFieldConditions({
      isSubmitting: false,
      isSubmitSuccessful: false,
      debouncedUsername: "user123",
      disabled: true,
    });
    expect(result).toBe(true);
  });

  it("CT5: Username vazio ou nulo (CD1=false, CD2=false, CD3=false, CD4=“”)", () => {
    const result = simulateUsernameFieldConditions({
      isSubmitting: false,
      isSubmitSuccessful: false,
      debouncedUsername: "",
      disabled: false,
    });
    expect(result).toBe(true);
  });
});
