---
title: Dynamic Data Modifiers
sidebar_position: 60
---

# Dynamic Data Modifiers

Dynamic data can be customized by applying modifiers directly to the data path.
For example: `item.modifier()`

This allows you to format or transform values before they are displayed.

## Available Modifiers

<table>
  <tr>
    <th width="20%">Modifier</th>
    <th width="40%">Description</th>
    <th width="40%">Example</th>
  </tr>
  <tbody>
    <tr>
      <td><code>.dateFormat()</code></td>
      <td>Formats a date into a user-friendly string. Refer to the <a href="https://www.php.net/manual/en/datetime.format.php" target="_blank" rel="noopener noreferrer">PHP DateTime::format documentation</a> for available formatting options. <br /><a href="#dateformat">More Details</a></td>
      <td><code>&#123;this.date.dateFormat("F j, Y")&#125;</code> → <code>July 25, 2025</code></td>
    </tr>
    <tr>
      <td><code>.numberFormat()</code></td>
      <td>
        Formats a number with grouped thousands and optional decimals.
        <details><summary>Arguments</summary> <code>decimals</code>: default <code>0</code><br /><code>decimalPoint</code>: default <code>"."</code><br /><code>thousandsSeparator</code>: default <code>","</code></details>
        <a href="#numberformat">More Details</a>
      </td>
      <td><code>value = 123456.78</code><br /><br /><code>&#123;item.value.numberFormat(2, '.', ',')&#125;</code> → <code>123,456.78</code></td>
    </tr>
    <tr>
      <td><code>.toUppercase()</code></td>
      <td>Converts all characters to uppercase.</td>
      <td><code>value = "John"</code><br /><br /><code>&#123;item.value.toUppercase()&#125;</code> → <code>JOHN</code></td>
    </tr>
    <tr>
      <td><code>.toLowercase()</code></td>
      <td>Converts all characters to lowercase.</td>
      <td><code>value = "John"</code><br /><br /><code>&#123;item.value.toLowercase()&#125;</code> → <code>john</code></td>
    </tr>
    <tr>
      <td><code>.toString()</code></td>
      <td>Converts to a string; arrays/objects become JSON when encodable. <br /><a href="#tostring">More Details</a></td>
      <td><code>value = true</code><br /><br /><code>&#123;item.value.toString()&#125;</code> → <code>"true"</code></td>
    </tr>
    <tr>
      <td><code>.toInt()</code></td>
      <td>Converts numeric values (incl. numeric strings) to an integer; leaves others unchanged. <br /><a href="#toint">More Details</a></td>
      <td><code>value = "123.9"</code><br /><br /><code>&#123;item.value.toInt()&#125;</code> → <code>123</code></td>
    </tr>
    <tr>
      <td><code>.toSlug()</code></td>
      <td>Generates a URL-friendly slug from a string. <br /><a href="#toslug">More Details</a></td>
      <td><code>value = "Über Theme"</code><br /><br /><code>&#123;item.value.toSlug()&#125;</code> → <code>"uber-theme"</code></td>
    </tr>
    <tr>
      <td><code>.toBool()</code></td>
      <td>Converts common truthy/falsey inputs to a boolean (<code>true</code>/<code>false</code>). <br /><a href="#tobool">More Details</a></td>
      <td><code>value = "yes"</code><br /><br /><code>&#123;item.value.toBool()&#125;</code> → <code>true</code></td>
    </tr>
    <tr>
      <td><code>.trim()</code></td>
      <td>Removes whitespace (including line breaks) at the beginning or end of a string.</td>
      <td><code>value = " hello "</code><br /><br /><code>&#123;item.value.trim()&#125;</code> → <code>"hello"</code></td>
    </tr>
    <tr>
      <td><code>.ltrim()</code></td>
      <td>Removes whitespace from the start of a string.</td>
      <td><code>value = "  hello"</code><br /><br /><code>&#123;item.value.ltrim()&#125;</code> → <code>"hello"</code></td>
    </tr>
    <tr>
      <td><code>.rtrim()</code></td>
      <td>Removes whitespace from the end of a string.</td>
      <td><code>value = "hello  "</code><br /><br /><code>&#123;item.value.rtrim()&#125;</code> → <code>"hello"</code></td>
    </tr>
    <tr>
      <td><code>.round()</code></td>
      <td>
        Rounds a number to the nearest integer or to a given precision.
        <details><summary>Arguments</summary> <code>precision</code>: <code>int</code>, default <code>0</code></details>
      </td>
      <td><code>value = "3.14159"</code><br /><br /><code>&#123;item.value.round(2)&#125;</code> → <code>3.14</code></td>
    </tr>
    <tr>
      <td><code>.ceil()</code></td>
      <td>Rounds a number up to the nearest integer.</td>
      <td><code>value = "1.2"</code><br /><br /><code>&#123;item.value.ceil()&#125;</code> → <code>2</code></td>
    </tr>
    <tr>
      <td><code>.floor()</code></td>
      <td>Rounds a number down to the nearest integer.</td>
      <td><code>value = "1.9"</code><br /><br /><code>&#123;item.value.floor()&#125;</code> → <code>1</code></td>
    </tr>
    <tr>
      <td><code>.includes()</code></td>
      <td>Checks if an array contains a value. Returns <code>true</code>/<code>false</code>.</td>
      <td><code>user.userRoles = ["author", "editor"]</code><br /><br /><code>&#123;user.userRoles.includes('editor')&#125;</code> → <code>true</code></td>
    </tr>
    <tr>
      <td><code>.join()</code></td>
      <td>Combines array elements into a string with a separator.</td>
      <td><code>user.userRoles = ["author", "editor"]</code><br /><br /><code>&#123;user.userRoles.join(', ')&#125;</code> → <code>"author, editor"</code></td>
    </tr>
  </tbody>
  </table>


## Detailed Modifier Reference

Below are some of the more complex modifiers and more detailed information about their usage.

### `.dateFormat()`
**Returns:** string (formatted date)

The `.dateFormat()` method formats Unix timestamps (seconds) or valid PHP date strings (e.g., `Y-m-d H:i:s`, `m/d/Y`, `F j, Y g:i a`). The arguments are passed as quoted strings (e.g., `.dateFormat("Y-m-d")`). Please refer to the [PHP datetime format documentation](https://www.php.net/manual/en/datetime.format.php) for more information. Invalid inputs are returned unchanged.

#### Examples:
- `{this.date.dateFormat("Y-m-d")}` → `"2024-02-01"`
- `{item.startDate.dateFormat("m/d/Y")}` → `"02/01/2024"`

⚠️ **Deprecated:** _`.format()` exists as a deprecated alias of `.dateFormat()`. Prefer `.dateFormat()` going forward._

---

### `.numberFormat()`
**Returns:** string (formatted number) or original value

The `.numberFormat()` method formats a numeric value with grouped thousands and configurable decimal precision/separators. It only applies to numeric inputs; non‑numeric values are returned unchanged. Arguments are passed as quoted strings (e.g., `numberFormat(2, ".", ",")`).

| Argument             | Type   | Default | Description                   |
| -------------------- | ------ | ------- | ----------------------------- |
| `decimals`           | int    | `0`     | Number of decimal digits      |
| `decimalPoint`       | string | `"."`   | Decimal separator character   |
| `thousandsSeparator` | string | `","`   | Thousands separator character |

#### Examples:
- value1 = `123456`<br />
  - `{item.value1.numberFormat(2, ".", ",")}` → `"123,456.00"`
- value2 = `1234567.123`<br />
  - `{item.value2.numberFormat(1, ",", ".")}` → `"1.234.567,1"`

---

### `.toString()`
**Returns:** string or original value

The `.toString()` method converts any value into its string representation. Booleans become the strings "true" or "false", scalar values are cast directly to strings, and arrays or objects are JSON-encoded when possible to provide a readable format.
#### Examples:
- value1 = `3.14`<br />
  - `{item.value1.toString()}` → "3.14"
- value2 = `true`<br />
  - `{item.value2.toString()}` → "true"
- value3 = `false`<br />
  - `{item.value3.toString()}` → "false"
- value4 = `null`<br />
  - `{item.value4.toString()}` → "" (empty string)

---

### `.toInt()`
**Returns:** int or original value

The `.toInt()` method converts numeric values to an integer by truncating any fractional part. If the value is already an integer it is returned as-is; if it’s numeric (including numeric strings like "123" or "123.45") it is cast to `(int)`. Non-numeric values are returned unchanged.

#### Examples:
- value1 = "123"<br />
  - `{item.value1.toInt()}` → `123`
- value2 = "123.9"<br />
  - `{item.value2.toInt()}` → `123`
- value3 = "abc"<br />
  - `{item.value3.toInt()}` → "abc" (unchanged)

---

### `.toSlug()`
**Returns:** string (slug) or original value

The `.toSlug()` method generates a URL‑friendly slug from a string: it lowercases the text, transliterates to ASCII, replaces non `[a–z][0–9]` characters with `-`, and trims leading/trailing hyphens. Only string inputs are transformed; other types are returned unchanged.

#### Examples:
- value = "Über Theme"<br />
  - `{item.value.toSlug()}` → "uber-theme"

#### Example use case: Generate CSS class names from values
- `<article class="post-{post.title.toSlug()}">...</article>`
- `<span class="role-{user.userRoles.toSlug()}">...</span>`

---

### `.toBool()`
**Returns:** boolean (`true`/`false`)

The `.toBool()` method normalizes common truthy/falsey inputs into a strict boolean. It is case-insensitive and supports strings ("true"/"false", "yes"/"no", "on"/"off"), numeric strings ("1"/"0"), and numeric values (1/0). `null` becomes `false`.
#### Example inputs that will convert to booleans:
- `1`, "1", "true", "yes", "on" → `true`
- `0`, "0", "false", "no", "off" → `false`
- `null` → `false`

---

## Additional Notes
- **Case transforms:** `.toUppercase()` and `.toLowercase()` only operate on strings.
- **Combining:** You can combine/stack modifiers. They are applied in the order they are written. For example, you could use `{user.fullName.toSlug().toUppercase()}` to transform a user named "Thomas Müller" to "THOMAS-MUELLER".
- **Unknown modifiers:** If a modifier name isn’t recognized, the internal call returns `null`, which results in an empty string.