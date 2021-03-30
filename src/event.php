<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Wagerr — The private, no limit sportsbook</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="../assets/images/wgrmodernicon-01.png">
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@wagerrx" />
  <meta name="twitter:title" content="Wagerr - The private, no limit sportsbook">
  <meta name="twitter:description" content="The private, no limit sportsbook">
  <meta name="twitter:image" content="https://img.wagerr.com/event.php?<?php echo $_SERVER['QUERY_STRING']; ?>">
  <meta name="og:image" content="https://img.wagerr.com/event.php?<?php echo $_SERVER['QUERY_STRING']; ?>">
  <?php
   if (isset($_GET['ref'])) {
   ?>
  <meta http-equiv="refresh" content="0;url=https://wagerr.com/sportsbook/ref/<?php echo $_GET['ref']; ?>" />
  <?php
  } else {
  ?>
  <meta http-equiv="refresh" content="0;url=https://wagerr.com/sportsbook/" />
  <?php
  }
  ?>
</head>
<body>
</body>
</html>
