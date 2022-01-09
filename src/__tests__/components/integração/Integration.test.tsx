import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Search from "../../../components/Search";
import Providers from "../../../providers";
import api from "../../../services";
import MockAdapter from "axios-mock-adapter";

const apiMock = new MockAdapter(api);

describe("Search Page/Component", () => {
  test("should be able to search", async () => {
    apiMock.onPost("/cep").replyOnce(200, {});

    render(
      <Providers>
        <Search />
      </Providers>
    );

    const cep = screen.getByPlaceholderText("Insira o CEP");
    const buttonElement = screen.getByRole("button");

    fireEvent.change(cep, { target: { value: 88085435 } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(cep).toHaveValue(88085435);
    });
  });
  test("should be able to not search", async () => {
    apiMock.onPost("/cep").replyOnce(200, {});

    render(
      <Providers>
        <Search />
      </Providers>
    );

    const cepText = screen.getByPlaceholderText("Insira o CEP");
    const buttonElement = screen.getByRole("button");

    fireEvent.change(cepText, { target: { value: 0 } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.queryByText("Logradouro")).not.toBeInTheDocument();
    });
  });
});
