import { formatTemperature } from "../lib/temperature";
import { getWmoDescription, getWmoEmoji } from "../lib/wmo";
import type { WeatherData } from "../types/weather";

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const { location, current } = data;
  const description = getWmoDescription(current.weather_code);

  return (
    <>
      <section
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
        aria-label={`Clima atual para ${location.name}`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {location.name}
            </h2>
            <p className="text-sm text-gray-500">
              {location.admin1 ? `${location.admin1}, ` : ""}
              {location.country}
            </p>
          </div>
          <span className="text-5xl" role="img" aria-label={description}>
            {getWmoEmoji(current.weather_code)}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-6xl font-light text-gray-800">
            {formatTemperature(current.temperature_2m, "C")}
          </p>
          <p className="mt-1 text-gray-500">
            Sensação: {formatTemperature(current.apparent_temperature, "C")}
          </p>
          <p className="mt-1 text-gray-600">{description}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
          <p>
            <span className="font-medium">Vento:</span>{" "}
            {Math.round(current.wind_speed_10m)} km/h
          </p>
          <p>
            <span className="font-medium">Umidade:</span>{" "}
            {current.relative_humidity_2m}%
          </p>
        </div>
      </section>

      <section
        className="mt-8 w-full max-w-4xl"
        aria-label={`Previsão de 7 dias para ${location.name}`}
      >
        <h2 className="text-xl font-bold text-gray-800">Próximos 7 dias</h2>
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {data.daily.time.map((date, index) => {
            const weatherCode = data.daily.weather_code[index];
            const dailyDescription = getWmoDescription(weatherCode);

            return (
              <li
                key={date}
                className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700"
              >
                <time
                  className="block font-medium text-gray-800"
                  dateTime={date}
                >
                  {new Intl.DateTimeFormat("pt-BR", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  }).format(new Date(`${date}T12:00:00`))}
                </time>
                <span className="mt-2 flex items-center gap-2">
                  <span
                    role="img"
                    aria-label={dailyDescription}
                    className="text-xl"
                  >
                    {getWmoEmoji(weatherCode)}
                  </span>
                  <span>{dailyDescription}</span>
                </span>
                <p className="mt-2">
                  Máx.:{" "}
                  {formatTemperature(data.daily.temperature_2m_max[index], "C")}
                </p>
                <p>
                  Mín.:{" "}
                  {formatTemperature(data.daily.temperature_2m_min[index], "C")}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
