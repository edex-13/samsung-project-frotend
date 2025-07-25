import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import useProductsData from "../../useProductsData";

describe("useProductsData", () => {
  it("should render without crashing", () => {
    const { result } = renderHook(() => useProductsData());
    expect(result.current).toBeDefined();
  });
}); 