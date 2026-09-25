import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as service from "../services/weather";
import type { Location, WeatherData } from "../types/weather";
import { useWeather } from "./useWeather";

afterEach(() => vi.restoreAllMocks());

const location: Location = {
  id: 1,
  name: "São Paulo",
  latitude: -23.55,
  longitude: -46.63,
  country: "Brasil",
  country_code: "BR",
};

const weather: WeatherData = {
  location,
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

describe("useWeather", () => {
  it("CA1.2: expõe os resultados encontrados", async () => {
    vi.spyOn(service, "searchLocations").mockResolvedValue([location]);
    const { result } = renderHook(() => useWeather());

    act(() => void result.current.search("São Paulo"));
    expect(result.current.searchState.status).toBe("loading");

    await waitFor(() =>
      expect(result.current.searchState).toEqual({
        status: "success",
        data: [location],
      }),
    );
  });

  it("CA1.3: transforma busca vazia em erro amigável", async () => {
    vi.spyOn(service, "searchLocations").mockResolvedValue([]);
    const { result } = renderHook(() => useWeather());

    act(() => void result.current.search("cidade inexistente"));

    await waitFor(() =>
      expect(result.current.searchState).toEqual({
        status: "error",
        message: "Nenhuma cidade encontrada.",
      }),
    );
  });

  it("CA2.5: carrega o clima da localização selecionada", async () => {
    vi.spyOn(service, "fetchWeather").mockResolvedValue(weather);
    const { result } = renderHook(() => useWeather());

    act(() => void result.current.selectLocation(location));
    expect(result.current.weatherState.status).toBe("loading");

    await waitFor(() =>
      expect(result.current.weatherState).toEqual({
        status: "success",
        data: weather,
      }),
    );
  });
});
