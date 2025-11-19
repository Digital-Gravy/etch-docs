---
title: User Dynamic Data
sidebar_position: 50
last_update:
  date: 2025-11-17
---

# User Dynamic Data Integration

You can extended the key `{user.CUSTOM}` using the following filter.

**Filter:** 
`etch/dynamic_data/user`

**Parameters:**
| Key                  | Description                                                                            |
| -------------------- | -------------------------------------------------------------------------------------- |
| `data`               | Array with all dynamic data for `user` key.                                            |
| `user_id`            | The User ID.                                                                           |


:::info
Make sure you always return an `array`, otherwise we will ignore the filter and pass the previous valid data.
:::

## How to use
### 1) Add the filter hook
You can add the filter in the `functions.php` or use a snippet plugin.

```php
add_filter('etch/dynamic_data/user', function( $data, $user_id ) {
    $data['user_custom_data'] = array(
        'field_name_1' => "Field 1 value",
        'field_name_2' => array(
            "sub_field_name_1" => "Sub Field 1 value"
        )
    );

    return $data;
});
```

### 2) Call the new key
With the filter created, now you can call it in the builder.
```html
{user.user_custom_data.field_name_1}
{user.user_custom_data.field_name_2.sub_field_name_1}
```