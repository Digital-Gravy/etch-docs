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
      <td><code>.toUpperCase()</code></td>
      <td>Converts all characters to uppercase (strings only).</td>
      <td><code>value = "John"</code><br /><br /><code>&#123;item.value.toUpperCase()&#125;</code> → <code>JOHN</code></td>
    </tr>
    <tr>
      <td><code>.toLowerCase()</code></td>
      <td>Converts all characters to lowercase (strings only).</td>
      <td><code>value = "John"</code><br /><br /><code>&#123;item.value.toLowerCase()&#125;</code> → <code>john</code></td>
    </tr>
    <tr>
      <td><code>.toString()</code></td>
      <td>Converts to a string. Arrays/objects become JSON when encodable. <br /><a href="#tostring">More Details</a></td>
      <td><code>value = true</code><br /><br /><code>&#123;item.value.toString()&#125;</code> → <code>"true"</code></td>
    </tr>
    <tr>
      <td><code>.toInt()</code></td>
      <td>Converts numeric values (incl. numeric strings) to an integer. Leaves others unchanged. <br /><a href="#toint">More Details</a></td>
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
      <td><code>.urlEncode()</code></td>
      <td>Encodes a string for usage inside a URL.</td>
      <td><code>value = "Hello World!"</code><br /><br /><code>&#123;item.value.urlEncode()&#125;</code> → <code>"Hello%20World!"</code></td>
    </tr>
    <tr>
      <td><code>.urlDecode()</code></td>
      <td>Decodes a URL-encoded string.</td>
      <td><code>value = "Hello%20World!"</code><br /><br /><code>&#123;item.value.urlDecode()&#125;</code> → <code>"Hello&nbsp;World!"</code></td>
    </tr>
    <tr>
      <td><code>.truncateChars()</code></td>
      <td>
        Truncates and returns the string after <code>count</code> characters.
        <details><summary>Arguments</summary><code>count</code>: maximum number of characters to keep<br/><code>ellipsis</code>: string to append if truncation occurs. default: <code>"..."</code></details>
      </td>
      <td>
        <code>title = "The quick brown fox jumps over the lazy dog"</code><br /><br /><code>&#123;title.truncateChars(15)&#125;</code> → <br/> <code>The quick brown...</code>
      </td>
    </tr>
    <tr>
      <td><code>.truncateWords()</code></td>
      <td>
        Truncates and returns the string after <code>count</code> words.
        <details><summary>Arguments</summary><code>count</code>: maximum number of words to keep<br/><code>ellipsis</code>: string to append if truncation occurs. default: <code>"..."</code></details>
      </td>
      <td>
        <code>title = "The quick brown fox jumps over the lazy dog"</code><br /><br /><code>&#123;title.truncateWords(2)&#125;</code> → <br/> <code>The quick...</code>
      </td>
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
      <td><code>.startsWith()</code></td>
      <td>
        Checks if a *string* starts with a given string. Returns 
        <code>true</code>/<code>false</code>.
      </td>
      <td>
        <code>value = "Hello World!"</code><br /><br /><code>&#123;item.value.startsWith('Hel')&#125;</code> → <code>true</code>
      </td>
    </tr>
    <tr>
      <td><code>.endsWith()</code></td>
      <td>
        Checks if a *string* ends with a given string. Returns 
        <code>true</code>/<code>false</code>.
      </td>
      <td>
        <code>value = "Hello World!"</code><br /><br /><code>&#123;item.value.endsWith('ld!')&#125;</code> → <code>true</code>
      </td>
    </tr>
    <tr>
      <td><code>.length()</code></td>
      <td>
        Returns the length of a *string* OR an *array*. 
      </td>
      <td>
        <code>value = ["Foo", "bar"]</code><br /><br /><code>&#123;item.value.length()&#125;</code> → <code>2</code>
      </td>
    </tr>
    <tr>
      <td><code>.reverse()</code></td>
      <td>
        Reverses the order of a *string* OR an *array*. 
      </td>
      <td>
        <code>value = [1, 2, 3]</code><br /><br /><code>&#123;item.value.reverse()&#125;</code> → <code>[3, 2, 1]</code>
      </td>
    </tr>
    <tr>
      <td><code>.at()</code></td>
      <td>
        Returns the element at the given array index.
        <details><summary>Arguments</summary> <code>index</code>: index of the value you want to get</details>
        <a href="#at">More Details</a>
      </td>
      <td><code>user.names = ["John", "David", "Sarah"]</code><br /><br /><code>&#123;user.names.at(1)&#125;</code> → <code>"David"</code></td>
    </tr>
    <tr>
      <td><code>.slice()</code></td>
      <td>
        Returns a portion of the array from <code>start</code> to <code>end</code> index.
        <details><summary>Arguments</summary><code>start</code>: index of the start value<br/><code>end</code>: index of the end value (not included)</details>
        <a href="#slice">More Details</a>
      </td>
      <td><code>animals = ["ant", "bison", "camel", "duck", "elephant"]</code><br /><br /><code>&#123;item.animals.slice(2)&#125;</code> → <code>["camel", "duck", "elephant"]</code></td>
    </tr>
    <tr>
      <td><code>.includes()</code></td>
      <td>
        Checks if a *string* contains a *substring* OR an *array* contains a *value*. Returns <code>true</code>/<code>false</code>.
        <details><summary>Arguments</summary> <code>search</code>: substring (for strings) or value (for arrays)</details>
        <a href="#includes">More Details</a>
      </td>
      <td><code>user.userRoles = ["author", "editor"]</code><br /><br /><code>&#123;user.userRoles.includes('editor')&#125;</code> → <code>true</code></td>
    </tr>
    <tr>
      <td><code>.join()</code></td>
      <td>Combines array elements into a string with a separator.</td>
      <td><code>user.userRoles = ["author", "editor"]</code><br /><br /><code>&#123;user.userRoles.join(', ')&#125;</code> → <code>"author, editor"</code></td>
    </tr>
    <tr>
      <td><code>.applyData()</code></td>
      <td>Reapplies available dynamic data to the given value.<br /><a href="#applydata">More Details</a></td>
      <td><code>item.text = "Hello &#123;user.name&#125;"</code><br /><br /><code>&#123;item.text.applyData()&#125;</code> → <code>"Hello John"</code></td>
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

### `.at()`
**Returns:** any (element at the given index)

The `.at()` method takes an integer value and returns the item at that index in the array, allowing for positive and negative integers.
Negative integers count back from the last item in the array.

| Argument             | Type   | Default | Description                                           |
| -------------------- | ------ | ------- | ------------------------------------------------------|
| `index`              | int    | —       | Zero-based index of the array element to be returned  |

#### Examples:
- value = `[5, 12, 8, 130, 44]`<br />
  - `{item.value.at(2)}` → `8`
  - `{item.value.at(-2)}` → `130`

---

### `.slice()`
**Returns:** array

Similar behaviour to <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" target="_blank" rel="noopener noreferrer">JS Array.prototype.slice()</a><br />
The `.slice()` returns a portion of the array, selected from start to end (end not included) where start and end represent the index of items in that array. 
Extraction happens up to but not including end.

| Argument             | Type   | Default | Description                                           |
| -------------------- | ------ | ------- | ------------------------------------------------------|
| `start`              | int    | —       | Zero-based index at which to start extraction         |
| `end`                | int    | array length       | Zero-based index at which to end extraction           |

#### Examples:
- value = `["ant", "bison", "camel", "duck", "elephant"]`<br />
  - `{item.value.slice(2)}` → `["camel", "duck", "elephant"]`
  - `{item.value.slice(2, 4)}` → `["camel", "duck"]`
  - `{item.value.slice(-2)}` → `["duck", "elephant"]`

---

### `.includes()`
**Returns:** boolean (`true`/`false`)

The `.includes()` method checks whether a string contains a given substring or an array contains a given value. String checks are case-sensitive. Array checks require an exact element match (substrings within array elements do not count as a match).

| Argument | Type          | Default | Description                                  |
| -------- | ------------- | ------- | -------------------------------------------- |
| `search` | string or any | —       | Substring to find (strings) or value to find (arrays) |

#### String Examples:
- value = `"foo bar"`
  - `{item.value.includes("foo")}` → `true`
  - `{item.value.includes("oo")}` → `true`
  - `{item.value.includes("Foo")}` → `false` (case-sensitive)
  - `{item.value.includes("test")}` → `false`

#### Array Examples:
- value = `["foo", "bar"]`
  - `{item.value.includes("foo")}` → `true`
  - `{item.value.includes("oo")}` → `false` (no substring matching)
  - `{item.value.includes("Foo")}` → `false` (case-sensitive)
  - `{item.value.includes("test")}` → `false`

---

### `.applyData()`
**Returns:** Returns the original value with dynamic data reapplied.

The `applyData()` method is an advanced feature that can be used to reapply dynamic data to an already resolved value.

#### Examples:

You might have a custom field that includes dynamic data, for example: `this.etch.header = "Welcome to {this.title}!"` <br/>
If you output `{this.etch.header}` directly, it will render as: <br /> `"Welcome to {this.title}!"` — without replacing `{this.title}`.

To resolve the dynamic data, call `.applyData()` on the value: `{this.etch.header.applyData()}` <br />
This first retrieves the original string, then reapplies the dynamic data, resulting in: <br />`"Welcome to Etch!` (or whatever value `{this.title}` resolves to).

---

## Additional Notes
- **Combining:** You can combine/stack modifiers. They are applied in the order they are written. For example, you could use `{user.fullName.toSlug().toUpperCase()}` to transform a user named "Thomas Müller" to "THOMAS-MUELLER".
- **Unknown modifiers:** If a modifier name isn’t recognized, the internal call returns `null`, which results in an empty string.