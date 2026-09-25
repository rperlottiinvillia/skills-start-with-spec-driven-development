import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { WeatherData } from "../types/weather";
import { WeatherCard } from "./WeatherCard";

const weather: WeatherData = {
  location: {
    id: 1,
    name: "São Paulo",
    latitude: -23.55,
    longitude: -46.63,
    country: "Brasil",
    country_code: "BR",
    admin1: "São Paulo",
  },
  current: {
    temperature_2m: 24,
    apparent_temperature: 25,
    weather_code: 1,
    wind_speed_10m: 10,
    relative_humidity_2m: 62,
  },
  daily: {
    time: [
      "2026-09-25",
      "2026-09-26",
      "2026-09-27",
      "2026-09-28",
      "2026-09-29",
      "2026-09-30",
      "2026-10-01",
    ],
    temperature_2m_max: [20, 21, 22, 23, 24, 25, 26],
    temperature_2m_min: [10, 11, 12, 13, 14, 15, 16],
    weather_code: [0, 1, 2, 3, 45, 51, 95],
  },
};

describe("WeatherCard", () => {
  it("CA2.1-CA2.4: apresenta os dados observáveis do clima atual", () => {
    render(<WeatherCard data={weather} />);

    const card = screen.getByLabelText("Clima atual para São Paulo");
    expect(card).toHaveTextContent("24°C");
    expect(card).toHaveTextContent("Sensação: 25°C");
    expect(card).toHaveTextContent("Principalmente limpo");
    expect(card).toHaveTextContent("Vento: 10 km/h");
    expect(card).toHaveTextContent("Umidade: 62%");
  });

  it("CA5.1-CA5.3: apresenta sete dias com temperaturas e condição WMO", () => {
    render(<WeatherCard data={weather} />);

    const forecast = screen.getByRole("region", {
      name: "Previsão de 7 dias para São Paulo",
    });
    const entries = within(forecast).getAllByRole("listitem");
    const expectedConditions = [
      "Céu limpo",
      "Principalmente limpo",
      "Parcialmente nublado",
      "Encoberto",
      "Névoa",
      "Chuvisco leve",
      "Tempestade",
    ];

    expect(entries).toHaveLength(7);

    entries.forEach((entry, index) => {
      expect(entry.querySelector("time")).toHaveAttribute(
        "dateTime",
        weather.daily.time[index],
      );
      expect(entry).toHaveTextContent(
        `Máx.: ${weather.daily.temperature_2m_max[index]}°C`,
      );
      expect(entry).toHaveTextContent(
        `Mín.: ${weather.daily.temperature_2m_min[index]}°C`,
      );
      expect(entry).toHaveTextContent(expectedConditions[index]);
      expect(
        within(entry).getByRole("img", { name: expectedConditions[index] }),
      ).toBeInTheDocument();
    });
  });
});
