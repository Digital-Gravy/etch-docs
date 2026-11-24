---
title: Automatic.css
sidebar_position: 72
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-11-24
---

# Automatic.css

`etch.acss` (`EtchAcssApi`) reads and changes the project's Automatic.css dashboard settings. Changes remain editable in the dashboard and trigger ACSS stylesheet regeneration. For authoring conventions, classes, and tokens, see the [`acss` skill](./skills.md).

## Availability

The namespace is optional. The `acss` capability means the runtime supports the API, **not** that Automatic.css is enabled for the project. Check `isEnabled()` separately:

```ts
if (etch.environment?.capabilities.acss === true && etch.acss) {
  console.log(etch.acss.isEnabled());
}
```

Changing settings or enabling ACSS requires permission to change project settings. Without it, writes reject with `NOT_AVAILABLE`.

## API

```ts
interface EtchAcssApi {
  isEnabled(): boolean;
  setEnabledAsync(enabled: boolean): Promise<AcssUpdateResult>;
  listSettingsAsync(query?: string): Promise<AcssSetting[]>;
  updateSettingsAsync(values: Record<string, AcssSettingValue>): Promise<AcssUpdateResult>;
}

type AcssSettingValue = string | number | boolean;

interface AcssSetting {
  id: string;
  type: string;
  label?: string;
  screen: string;
  value: AcssSettingValue | undefined;
  default: AcssSettingValue | undefined;
  options?: string[];
}

interface AcssUpdateResult {
  warnings: string[];
}
```

## Enabling and disabling

`setEnabledAsync(true)` turns ACSS on and attempts to generate its stylesheets; `setEnabledAsync(false)` turns it off and removes them. The `acss` skill is available while ACSS is enabled. Successful changes persist immediately, without `etch.saveAsync()`.

```ts
if (etch.environment?.capabilities.acss === true && etch.acss) {
  const result = await etch.acss.setEnabledAsync(true);
  for (const warning of result.warnings) console.warn(warning);
}
```

## Reading and updating settings

`listSettingsAsync()` returns settings with their IDs, current and default values, dashboard screen, and type, even while ACSS is disabled. An optional query filters by ID, label, or screen, ignoring case. Select settings also include their accepted `options`.

```ts
if (etch.environment?.capabilities.acss === true && etch.acss?.isEnabled()) {
  const settings = await etch.acss.listSettingsAsync("primary");
  console.log(settings);

  const result = await etch.acss.updateSettingsAsync({
    "color-primary": "#1e6bd6",
    "option-secondary-clr": true,
  });
  for (const warning of result.warnings) console.warn(warning);
}
```

Use the returned IDs and types to choose values. Types include `color`, `toggle`, `select`, `px`, `rem`, `percent`, `number`, `text`, `textarea`, and `codebox`. A palette color accepts an opaque CSS color, is read back as hex, and recomputes its shades. A toggle takes a boolean; a select must match an accepted option.

Updates are validated together: an unknown ID or invalid value rejects with `INVALID_ARGUMENT` before anything is saved. `updateSettingsAsync()` rejects with `ACSS_DISABLED` while ACSS is off. Successful updates persist immediately and trigger stylesheet regeneration; no `etch.saveAsync()` is needed.

## Warnings and errors

Always inspect `warnings` after `setEnabledAsync()` or `updateSettingsAsync()`. A nonempty array means the change was saved, but part of the stylesheet regeneration or the builder's stylesheet reload failed. A stylesheet that could not be regenerated keeps its previous version if one exists. A warning does not mean the settings write failed.

An `OPERATION_FAILED` rejection does not guarantee that nothing was saved: settings can persist before stylesheet regeneration fails. A failed update can also leave values changed in the dashboard, where a later save can persist them. Check the current settings, dashboard values and stylesheets before retrying. Invalid inputs reject with `INVALID_ARGUMENT` before application; missing project-settings permission rejects with `NOT_AVAILABLE`.
