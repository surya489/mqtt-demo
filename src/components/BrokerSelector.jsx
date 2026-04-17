import { useState } from "react";

function BrokerSelector({
  mode,
  setMode,
  publicBrokerUrl,
  hiveWsUrl,
  setHiveWsUrl,
  hiveUsername,
  setHiveUsername,
  hivePassword,
  setHivePassword,
  hiveDefaultUrl,
  hiveDefaultUsername,
  hiveDefaultPassword,
  sectionClass,
  primaryBtnClass,
  subtleBtnClass,
  fieldClass,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPrefilledUrl = hiveWsUrl === hiveDefaultUrl && hiveDefaultUrl;
  const isPrefilledUsername = hiveUsername === hiveDefaultUsername && hiveDefaultUsername;
  const isPrefilledPassword = hivePassword === hiveDefaultPassword && hiveDefaultPassword;
  const [isPrefilled, setIsPrefilled] = useState(
    isPrefilledUrl && isPrefilledUsername && isPrefilledPassword
  );

  const maskUrl = (url) => {
    if (!url) return "";
    const parts = url.split("://");
    if (parts.length !== 2) return url;
    const protocol = parts[0] + "://";
    const rest = parts[1];
    if (rest.length <= 10) return url;
    const start = rest.slice(0, 5);
    const end = rest.slice(-5);
    return protocol + start + "******" + end;
  };

  const maskUsername = (username) => {
    if (!username || username.length <= 3) return username;
    const start = username.slice(0, 2);
    const end = username.slice(-2);
    return start + "***" + end;
  };

  const maskPassword = (password) => {
    if (!password || password.length <= 4) return password;
    const start = password.slice(0, 2);
    const end = password.slice(-4);
    return start + "****" + end;
  };

  const handleEdit = () => {
    setHiveWsUrl("");
    setHiveUsername("");
    setHivePassword("");
    setIsPrefilled(false);
  };

  const displayUrl = isPrefilled ? maskUrl(hiveWsUrl) : hiveWsUrl;
  const displayUsername = isPrefilled ? maskUsername(hiveUsername) : hiveUsername;
  const displayPassword = isPrefilled ? maskPassword(hivePassword) : (showPassword ? hivePassword : maskPassword(hivePassword));

  return (
    <section className={`${sectionClass} mb-5`}>
      <h2 className="text-xl font-semibold text-slate-900">Choose Broker Page</h2>

      <div className="mt-3 flex flex-wrap gap-3">
        <button
          onClick={() => setMode("public")}
          disabled={mode === "public"}
          type="button"
          className={mode === "public" ? primaryBtnClass : subtleBtnClass}
        >
          Public Broker Learning
        </button>
        <button
          onClick={() => setMode("hive")}
          disabled={mode === "hive"}
          type="button"
          className={mode === "hive" ? primaryBtnClass : subtleBtnClass}
        >
          HiveMQ Credentials Page
        </button>
      </div>

      {mode === "public" ? (
        <p className="mt-3 text-sm text-slate-700">
          Using public test broker: <code>{publicBrokerUrl}</code>.
        </p>
      ) : (
        <div className="mt-4">
          {!isPrefilled && (
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-700">Using your prefilled credentials</p>
              <button
                onClick={handleEdit}
                type="button"
                className="text-slate-500 hover:text-slate-700"
                title="Edit credentials"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          )}
          {!isPrefilled && (
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-700">Cancel</p>
              <button
                onClick={() => {
                  setIsPrefilled(true);
                  setHiveWsUrl(hiveDefaultUrl);
                  setHiveUsername(hiveDefaultUsername);
                  setHivePassword(hiveDefaultPassword);
                }}
                type="button"
                className="text-slate-500 hover:text-slate-700"
                title="Calcel credentials"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          )}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="hive-url" className="mb-1 block text-xs font-medium text-slate-600">
                WebSocket URL
              </label>
              <input
                id="hive-url"
                value={displayUrl}
                onChange={(e) => setHiveWsUrl(e.target.value)}
                className={fieldClass}
                placeholder="wss://cluster.s1.eu.hivemq.cloud:8884/mqtt"
                readOnly={isPrefilled}
                onCopy={isPrefilled ? (e) => e.preventDefault() : undefined}
              />
            </div>
            <div>
              <label htmlFor="hive-user" className="mb-1 block text-xs font-medium text-slate-600">
                Username
              </label>
              <input
                id="hive-user"
                value={displayUsername}
                onChange={(e) => setHiveUsername(e.target.value)}
                className={fieldClass}
                placeholder="your-hivemq-username"
                readOnly={isPrefilled}
                onCopy={isPrefilled ? (e) => e.preventDefault() : undefined}
              />
            </div>
            <div>
              <label htmlFor="hive-pass" className="mb-1 block text-xs font-medium text-slate-600">
                Password
              </label>
              <div className="relative">
                <input
                  id="hive-pass"
                  type={showPassword ? "text" : "password"}
                  value={displayPassword}
                  onChange={(e) => setHivePassword(e.target.value)}
                  className={fieldClass}
                  placeholder="your-hivemq-password"
                  readOnly={isPrefilled}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default BrokerSelector;
