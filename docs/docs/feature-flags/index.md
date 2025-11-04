---
title: Feature Flags
description: Learn how to use feature flags in Etch to control feature availability and enable gradual rollouts
---

# Feature Flags

Feature flags allow us to deploy in-progress or in-testing features safely. If you want to turn on a testable feature, you can enable the flag. If we ship an update with a flagged feature on, you can turn it off.

## How Feature Flags Work

Feature flags are boolean values that control whether a feature is enabled or disabled. If a feature is causing issues, you can turn its flag off. This allows you to enjoy other aspects of the release version without the issues caused by the problematic feature. We also might ship a feature with the flag turned off by default, allowing you to opt-in to testing it.


### Basic Usage

To use Feature Flags, you can create a `json` file called `flags.user.json` in `/wp-content/uploads/etch/`. This file allows you to override the default value for any specific flag on a flag-by-flag basis. Any flag not specified in your `flags.user.json` file will use its default value. If this file doesn't exist, or if it is an empty JSON object (`{}`), Etch will use the default flag values for all flags.

The file should use the following format:

```json
{
    "FLAG_NAME": "on",
    "FLAG_NAME_2": "off"
}
```

:::info
The `flags.user.json` must be a valid JSON file. An invalid JSON file (including an empty file) will cause an error.
:::

:::warning
Because flags defined in `flags.user.json` override their default values, you are responsible for managing these overrides across updates.

For example, if we ship an update where a flag that was previously `off` is now `on`, but you have set it to `off` in your `flags.user.json` file, your value will take precedence. You will have to remember to remove the flag from your file to get the new default behavior.
::: 

You can choose from the available flags below. Their default state is listed.

## Available Feature Flags

| Flag Name | Description | Default |
|-----------|-------------|---------|
| `ENABLE_DEBUG_LOG` | Enables debug logging | `off` |
| `ENABLE_SERVER_TIMING` | Enables server timing headers for performance monitoring | `off` |
| `REMOVE_WP_DEFAULT_CSS` | Removes WordPress default CSS | `on` |
| `ENABLE_WAF_COMPATIBILITY_WORKAROUND` | Improves compatibility with WAF that don't allow `PUT`, `PATCH` or `DELETE` requests | `on`
| `UNSAVED_CHANGES_WARNING` | Enables warning before closing tab with unsaved changes| `on` |
| `RETURN_ACF_DYNAMIC_DATA` | Enables returning data based on the ACF field settings. | `off` |
