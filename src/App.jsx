import { useMemo, useState } from 'react';
import { getMissingEnvVars, hasSupabaseEnv } from './lib/env';
import { healthcheckSupabase } from './lib/supabaseClient';
import { getAgentCount, runAgentSwarm } from './lib/agentSwarm';

const checklist = [
  'Supabase project created with Auth + Postgres enabled',
  'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY configured in host',
  'Service role key stored only in server-side secrets (never in client)',
  'CI passes npm run lint + npm run build on every pull request',
  'Preview deploys enabled for each branch',
  'Production deploy gated on main branch with required checks',
  'Error monitoring configured (Sentry or Logtail)',
  'Usage limits / credits flow implemented before public launch',
];

function App() {
  const missing = getMissingEnvVars();
  const [health, setHealth] = useState(null);
  const [prompt, setPrompt] = useState('Build a multi-tenant CRM with workspace dashboard and task tracking');
  const [swarmResult, setSwarmResult] = useState(() => runAgentSwarm('Build a multi-tenant CRM with workspace dashboard and task tracking'));

  const runSupabaseHealthcheck = async () => {
    const result = await healthcheckSupabase();
    setHealth(result);
  };

  const runSwarm = () => {
    setSwarmResult(runAgentSwarm(prompt));
  };

  const passedChecks = useMemo(
    () => swarmResult.output?.checks.filter((check) => check.pass).length ?? 0,
    [swarmResult],
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <p className="mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-medium">
          Lovable-Clone CTO delivery cockpit
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Agent Swarm MVP Console</h1>
        <p className="mt-3 text-muted-foreground">
          This starter now simulates a 5-agent brain that converts prompts into scoped plans and
          starter files so you can validate flow before full backend orchestration.
        </p>

        <section className="mt-8 rounded-xl border p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Swarm brain overview</h2>
            <span className="rounded-md bg-muted px-3 py-1 text-xs">Agents: {getAgentCount()}</span>
          </div>

          <label className="mt-4 block text-sm font-medium" htmlFor="prompt">
            Product prompt
          </label>
          <textarea
            id="prompt"
            className="mt-2 w-full rounded-md border bg-background p-3 text-sm"
            rows={3}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          />
          <button className="mt-3 rounded-md border px-3 py-2 text-xs" type="button" onClick={runSwarm}>
            Run Agent Swarm
          </button>

          {swarmResult.error ? (
            <p className="mt-3 text-sm text-destructive">{swarmResult.error}</p>
          ) : (
            <div className="mt-4 space-y-4 text-sm">
              <div className="rounded-md border p-3">
                <p className="font-medium">Generated project</p>
                <p>{swarmResult.output.projectName}</p>
                <p className="text-muted-foreground">Domain: {swarmResult.output.domain}</p>
              </div>

              <div className="rounded-md border p-3">
                <p className="font-medium">Plan</p>
                <ul className="ml-5 list-disc">
                  {swarmResult.output.plan.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-md border p-3">
                <p className="font-medium">Generated files ({swarmResult.output.files.length})</p>
                <ul className="ml-5 list-disc">
                  {swarmResult.output.files.map((file) => (
                    <li key={file.path}>{file.path}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-md border p-3">
                <p className="font-medium">QA checks: {passedChecks}/{swarmResult.output.checks.length}</p>
                <ul className="ml-5 list-disc">
                  {swarmResult.output.checks.map((check) => (
                    <li key={check.name}>
                      {check.pass ? '✅' : '❌'} {check.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-xl border p-5">
          <h2 className="text-xl font-semibold">Supabase status</h2>
          {hasSupabaseEnv() ? (
            <div className="mt-2 text-sm">
              <p className="text-emerald-600">✅ Supabase environment is configured.</p>
              <button
                className="mt-3 rounded-md border px-3 py-2 text-xs"
                onClick={runSupabaseHealthcheck}
                type="button"
              >
                Run Supabase healthcheck
              </button>
              {health && (
                <pre className="mt-3 overflow-x-auto rounded-md bg-muted p-3 text-xs">
                  {JSON.stringify(health, null, 2)}
                </pre>
              )}
            </div>
          ) : (
            <div className="mt-2 text-sm text-amber-600">
              <p>⚠️ Missing required client env vars:</p>
              <ul className="ml-5 list-disc">
                {missing.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-xl border p-5">
          <h2 className="text-xl font-semibold">Automatic deployment checklist</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {checklist.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default App;
