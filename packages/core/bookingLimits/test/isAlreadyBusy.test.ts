import { describe, test, expect, beforeEach } from "vitest";

import dayjs from "@calcom/dayjs";

import LimitManager from "../limitManager";

describe("LimitManager.isAlreadyBusy", () => {
  let limitManager: LimitManager;

  beforeEach(() => {
    limitManager = new LimitManager();
  });

  test("Ano ocupado deve retornar true para qualquer unidade", () => {
    const start = dayjs("2025-02-08");
    limitManager.busyMap.set(LimitManager.createKey(start, "year"), true);

    expect(limitManager.isAlreadyBusy(start, "year")).toBe(true);
    expect(limitManager.isAlreadyBusy(start, "month")).toBe(true);
    expect(limitManager.isAlreadyBusy(start, "week")).toBe(true);
    expect(limitManager.isAlreadyBusy(start, "day")).toBe(true);
  });

  test("Mês ocupado deve retornar true para month, week e day", () => {
    const start = dayjs("2025-02-08");
    limitManager.busyMap.set(LimitManager.createKey(start, "month"), true);

    expect(limitManager.isAlreadyBusy(start, "month")).toBe(true);
    expect(limitManager.isAlreadyBusy(start, "week")).toBe(true);
    expect(limitManager.isAlreadyBusy(start, "day")).toBe(true);
  });

  test("Semana ocupada deve considerar semanas que cruzam meses", () => {
    const start = dayjs("2025-02-28");
    const endOfWeek = start.endOf("week");

    limitManager.busyMap.set(LimitManager.createKey(endOfWeek, "month"), true);
    limitManager.busyMap.set(LimitManager.createKey(start, "week"), true);

    expect(limitManager.isAlreadyBusy(start, "week")).toBe(true);
  });

  test("Dia ocupado deve retornar true apenas para day", () => {
    const start = dayjs("2025-02-08");
    limitManager.busyMap.set(LimitManager.createKey(start, "day"), true);

    expect(limitManager.isAlreadyBusy(start, "day")).toBe(true);
    expect(limitManager.isAlreadyBusy(start, "week")).toBe(false);
    expect(limitManager.isAlreadyBusy(start, "month")).toBe(false);
  });
});
