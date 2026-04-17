import { Card } from "./Card";
import { sectionClass } from "../constants";

const FlowPage = () => {

  return (
    <>
      <Card customClass="mb-5" title="Step 1: What Is MQTT">
        MQTT full form: <strong>Message Queuing Telemetry Transport</strong>. Think of
        MQTT like a radio system. One app speaks on a channel, and all listeners on
        that channel hear it instantly.
      </Card>

      <section className={`${sectionClass} mb-5`}>
        <h2 className="text-xl font-semibold text-slate-900">Step 2: Broker (What, Why, How)</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
            <p className="text-sm font-semibold text-sky-900">What</p>
            <p className="mt-1 text-sm text-slate-700">Broker is the middle server in MQTT.</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-sm font-semibold text-emerald-900">Why</p>
            <p className="mt-1 text-sm text-slate-700">It routes messages from sender to subscribers.</p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-3">
            <p className="text-sm font-semibold text-violet-900">How</p>
            <p className="mt-1 text-sm text-slate-700">Connect app to broker URL, then subscribe/publish.</p>
          </div>
        </div>
      </section>

      <section className={`${sectionClass} mb-5`}>
        <h2 className="text-xl font-semibold text-slate-900">Step 3: Topic (What, Why, How)</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
            <p className="text-sm font-semibold text-sky-900">What</p>
            <p className="mt-1 text-sm text-slate-700">Topic is the message channel name, like <code>learning/course/created</code>.</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-sm font-semibold text-emerald-900">Why</p>
            <p className="mt-1 text-sm text-slate-700">
              It sends the right event to the right listeners. Without a topic, MQTT
              cannot route data at all.
            </p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-3">
            <p className="text-sm font-semibold text-violet-900">How</p>
            <p className="mt-1 text-sm text-slate-700">Use clean format: <code>domain/module/action</code>.</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-700">
          Important: In MQTT, topic is mandatory for both publish and subscribe.
          No topic means no message delivery.
        </p>
      </section>

      <section className={`${sectionClass} mb-5`}>
        <h2 className="text-xl font-semibold text-slate-900">Step 4: Domain, Module, Action</h2>
        <p className="mt-2 text-sm text-slate-700">Example: <code>learning/course/created</code></p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <span className="rounded-full bg-cyan-100 px-2 py-1 text-xs font-semibold text-cyan-800">Domain</span>
            <p className="mt-2 text-sm text-slate-700">Big area, like <code>learning</code> or <code>delivery</code>.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">Module</span>
            <p className="mt-2 text-sm text-slate-700">Feature name, like <code>course</code> or <code>rider</code>.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-semibold text-violet-800">Action</span>
            <p className="mt-2 text-sm text-slate-700">What happened, like <code>created</code> or <code>updated</code>.</p>
          </div>
        </div>
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-sm font-semibold text-slate-900">How They Interact</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
            <li>Publisher creates event using full topic path.</li>
            <li>Broker checks this topic path and finds matching subscribers.</li>
            <li>Subscribers who listen to same topic receive the event instantly.</li>
          </ol>
          <p className="mt-2 text-sm text-slate-700">
            Example flow: admin app publishes <code>learning/course/created</code>,
            notification and analytics services both receive it at once.
          </p>
        </div>
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-sm font-semibold text-amber-900">How A Good Topic Should Look</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Use lowercase: <code>learning/course/created</code></li>
            <li>Keep names meaningful, not random text.</li>
            <li>Use slash-separated levels for easy filtering.</li>
            <li>Avoid spaces and special characters where possible.</li>
          </ul>
        </div>
      </section>

      <section className={`${sectionClass} mb-5`}>
        <h2 className="text-xl font-semibold text-slate-900">Step 5: Real-World Examples</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-800">Delivery</span>
            <p className="mt-2 text-sm font-semibold text-slate-900">Food Order</p>
            <p className="mt-1 text-sm text-slate-700">
              Customer places order. Topic: <code>orders/food-order/created</code>.
              Restaurant app, delivery app, and billing service all receive same event.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <span className="rounded-full bg-cyan-100 px-2 py-1 text-xs font-semibold text-cyan-800">Tracking</span>
            <p className="mt-2 text-sm font-semibold text-slate-900">Rider Location</p>
            <p className="mt-1 text-sm text-slate-700">
              Rider GPS device sends updates every few seconds. Topic:{" "}
              <code>delivery/rider/location-updated</code>. Customer map updates live.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-800">Education</span>
            <p className="mt-2 text-sm font-semibold text-slate-900">Course Created</p>
            <p className="mt-1 text-sm text-slate-700">
              Admin publishes new course event. Topic: <code>learning/course/created</code>.
              Notification service sends in-app alert and email automatically.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">IoT</span>
            <p className="mt-2 text-sm font-semibold text-slate-900">Room Sensor</p>
            <p className="mt-1 text-sm text-slate-700">
              Temperature sensor publishes data continuously. Topic:{" "}
              <code>home/living-room/temperature</code>. Mobile app and automation
              rules both react to the same live reading.
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-700">
          Pattern in all examples: one publisher, one broker, many subscribers.
          This is why MQTT is powerful for real-time systems.
        </p>
      </section>
    </>
  );
};

export default FlowPage;