import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import App from "../../../App";
import api from "../../../services";
import MockAdapter from "axios-mock-adapter";
import Providers from "../../../providers";

const apiMock = new MockAdapter(api);

describe("Searching Cep", () => {
  it("should be able to return an adress", async () => {
    apiMock.onGet("88085435").replyOnce(200, {
      bairro: "Itaguaçu",
      cep: "88085435",
      cidade: "Florianópolis",
      cidade_info: { area_km2: "675,409", codigo_ibge: "4205407" },
      estado: "SC",
      estado_info: {
        area_km2: "95.737,895",
        codigo_ibge: "42",
        nome: "Santa Catarina",
      },
      logradouro: "Rua João Meirelles",
    });

    render(
      <Providers>
        <App />
      </Providers>
    );

    const inputField = screen.getByPlaceholderText("Insira o CEP");
    const buttonField = screen.getByRole("button");

    fireEvent.change(inputField, {
      target: {
        value: "88085435",
      },
    });

    fireEvent.click(buttonField);

    await waitFor(() => {
      expect(
        screen.getByDisplayValue("Rua João Meirelles")
      ).toBeInTheDocument();
    });
  });
});
