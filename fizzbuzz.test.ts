import { expect, test, describe } from "vitest";
import { fizzBuzz } from "./fizzbuzz";

describe("FizzBuzz", () => {
  test("3の倍数の場合はFizzを返す", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
    expect(fizzBuzz(6)).toBe("Fizz");
    expect(fizzBuzz(9)).toBe("Fizz");
  });

  test("5の倍数の場合はBuzzを返す", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
    expect(fizzBuzz(10)).toBe("Buzz");
    expect(fizzBuzz(20)).toBe("Buzz");
  });

  test("3と5の両方の倍数の場合はFizzBuzzを返す", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
    expect(fizzBuzz(30)).toBe("FizzBuzz");
    expect(fizzBuzz(45)).toBe("FizzBuzz");
  });

  test("3の倍数でも5の倍数でもない場合は数字を文字列として返す", () => {
    expect(fizzBuzz(1)).toBe("1");
    expect(fizzBuzz(2)).toBe("2");
    expect(fizzBuzz(4)).toBe("4");
  });
});
