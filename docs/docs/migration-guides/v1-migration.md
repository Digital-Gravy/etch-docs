---
title: V1 Migration
description: Guide on how to migrate existing instances to 1.0.0
---

# Migrating to 1.0.0

Version **1.0.0** is the first stable release and marks the end of active support for pre-alpha, alpha, and beta versions. **We strongly recommend migrating to v1.0.0 as soon as possible** to ensure continued compatibility, stability, and access to ongoing improvements and fixes.

If you’re running a pre-alpha, alpha, or beta instance, migrating to v1 requires stepping through the release stages in order rather than upgrading directly. **Skipping intermediate versions may result in incomplete migrations or data loss.**

This guide outlines the recommended upgrade path and what to expect during the process. While migration steps are provided wherever possible, some breakages are unavoidable due to intentional breaking changes introduced over the course of development—particularly in early pre-alpha and alpha releases.

Before you begin, ensure you have **full backups** and allow time to **validate your instance** after each upgrade step.

## Recommended Migration Path

### 1. Back up your instances
Create a full backup of your instances before starting. This allows you to safely roll back if anything goes wrong during the migration.

### 2. Upgrade pre-alpha and alpha instances to the latest alpha
Upgrade all pre-alpha and early alpha instances to **`1.0.0-alpha-15`**.  
This release includes required migration steps and **must not be skipped**.

When opening Etch on `alpha-15`, a modal will appear prompting you to complete the migration process. Follow the instructions in the modal carefully to ensure a successful upgrade.

### 3. Upgrade alpha and beta instances to the latest beta
Once you are on the latest alpha, upgrade to the most recent beta release to transition to the stabilized pre-v1 architecture.

The latest beta release is **`1.0.0-beta-15`**.

### 4. Upgrade beta or RC instances straight to 1.0.0
Finally, upgrade from the latest beta or RC to **`1.0.0`**.

## Known Caveats

Even when following the recommended path, you may encounter issues—especially when migrating from pre-alpha or early alpha versions. This is expected due to breaking changes introduced during development, including:

- The move to **custom Gutenberg blocks**, which requires data migration in `alpha-15`
- Changes to how **dynamic data** is handled
- Structural refinements to internal APIs and block definitions