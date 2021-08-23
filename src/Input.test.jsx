import React from "react";

import { render, fireEvent } from "@testing-library/react";

import Input from "./Input";

test("Input", () => {
  const value = "할 일1";

  const handleChange = jest.fn();

  const handleClick = jest.fn();

  const { container, getByText } = render(
    <Input value={value} onChange={handleChange} onClick={handleClick} />
  );

  expect(container).toHaveTextContent("할 일");

  fireEvent.click(getByText("추가"));
});
