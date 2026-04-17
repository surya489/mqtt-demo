import { sectionClass } from "../constants";

const ProvidersPage = () => {

  const providerCards = [
    {
      name: "HiveMQ Cloud",
      useCase: "Managed MQTT broker for app backends and IoT projects.",
      goodFor: "Easy setup, secure cloud broker, production use.",
    },
    {
      name: "EMQX Cloud",
      useCase: "High-scale MQTT platform with rich integrations.",
      goodFor: "Large device fleets and event-heavy systems.",
    },
    {
      name: "AWS IoT Core",
      useCase: "MQTT with deep AWS ecosystem integration.",
      goodFor: "Teams already using AWS services.",
    },
    {
      name: "Azure IoT Hub",
      useCase: "Device-to-cloud messaging in Azure environment.",
      goodFor: "Enterprise IoT on Microsoft stack.",
    },
    {
      name: "Cedalo Mosquitto",
      useCase: "Commercial offering around Mosquitto broker.",
      goodFor: "Teams wanting Mosquitto with managed options.",
    },
    {
      name: "Self-Hosted Mosquitto",
      useCase: "Run your own MQTT broker on your server.",
      goodFor: "Full control, low cost, custom deployments.",
    },
  ];

  return (
    <>
      <section className={`${sectionClass} mb-5`}>
        <h2 className="text-xl font-semibold text-slate-900">MQTT Providers</h2>
        <p className="mt-2 text-sm text-slate-700">
          Yes, you can use providers other than HiveMQ. Choose based on scale,
          cloud preference, and budget.
        </p>
      </section>

      <section className="mb-5 grid gap-3 md:grid-cols-2">
        {providerCards.map((provider) => (
          <div key={provider.name} className={sectionClass}>
            <h3 className="text-lg font-semibold text-slate-900">{provider.name}</h3>
            <p className="mt-2 text-sm text-slate-700"><strong>Use case:</strong> {provider.useCase}</p>
            <p className="mt-1 text-sm text-slate-700"><strong>Good for:</strong> {provider.goodFor}</p>
          </div>
        ))}
      </section>

      <section className={`${sectionClass} mb-5`}>
        <h2 className="text-xl font-semibold text-slate-900">Helpful References</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>
            MQTT.org: <a className="text-cyan-700 underline" href="https://mqtt.org/" target="_blank" rel="noreferrer">https://mqtt.org/</a>
          </li>
          <li>
            HiveMQ MQTT Essentials: <a className="text-cyan-700 underline" href="https://www.hivemq.com/mqtt-essentials/" target="_blank" rel="noreferrer">https://www.hivemq.com/mqtt-essentials/</a>
          </li>
          <li>
            MQTT.js docs: <a className="text-cyan-700 underline" href="https://github.com/mqttjs/MQTT.js" target="_blank" rel="noreferrer">https://github.com/mqttjs/MQTT.js</a>
          </li>
        </ul>
      </section>
    </>
  );
};

export default ProvidersPage;