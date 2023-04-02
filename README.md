# Javascript PHPDateTime
## Created by: Kevin Oliveira

Javascript DateTime based on PHP DateTime class 

## Constructor examples:

var phpDateTime = new PHPDateTime({ format: "Y-m-d", datetime: "2023-01-01" });
var phpDateTime = new PHPDateTime({ format: "Y-m-d H:i:s", datetime: "2023-01-01 00:01:59" });

## Formatter examples:

- Normal format:
phpDateTime.format("Y-m-d") // Output: 2023-03-01
phpDateTime.format("Y-m-d H:i:s") // Output: 2023-03-01 00:01:59

- Escape string:
phpDateTime.format("Y-m-d {às} H:i:s") // Output: 2023-03-01 às 00:01:59
