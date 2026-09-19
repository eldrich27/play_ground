Add-Type -AssemblyName System.Drawing

$output = Join-Path $PSScriptRoot "images"
$background = [Drawing.Color]::FromArgb(248, 250, 252)
$ink = [Drawing.Color]::FromArgb(30, 41, 59)
$muted = [Drawing.Color]::FromArgb(71, 85, 105)
$blue = [Drawing.Color]::FromArgb(37, 99, 235)
$blueLight = [Drawing.Color]::FromArgb(219, 234, 254)
$teal = [Drawing.Color]::FromArgb(13, 148, 136)
$tealLight = [Drawing.Color]::FromArgb(204, 251, 241)
$orange = [Drawing.Color]::FromArgb(234, 88, 12)
$orangeLight = [Drawing.Color]::FromArgb(255, 237, 213)
$green = [Drawing.Color]::FromArgb(22, 163, 74)
$greenLight = [Drawing.Color]::FromArgb(220, 252, 231)
$border = [Drawing.Color]::FromArgb(203, 213, 225)

function New-Canvas($file, $title, $subtitle) {
  $bitmap = New-Object Drawing.Bitmap(1600, 900)
  $graphics = [Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear($background)
  $titleFont = New-Object Drawing.Font("Segoe UI", 30, [Drawing.FontStyle]::Bold)
  $subtitleFont = New-Object Drawing.Font("Segoe UI", 16)
  $graphics.DrawString($title, $titleFont, (New-Object Drawing.SolidBrush($ink)), 70, 48)
  $graphics.DrawString($subtitle, $subtitleFont, (New-Object Drawing.SolidBrush($muted)), 72, 98)
  return @{ Bitmap = $bitmap; Graphics = $graphics; File = (Join-Path $output $file) }
}

function Draw-Box($g, $x, $y, $w, $h, $label, $detail, $fill, $stroke) {
  $rect = New-Object Drawing.Rectangle($x, $y, $w, $h)
  $g.FillRectangle((New-Object Drawing.SolidBrush($fill)), $rect)
  $g.DrawRectangle((New-Object Drawing.Pen($stroke, 3)), $rect)
  $labelFont = New-Object Drawing.Font("Segoe UI", 20, [Drawing.FontStyle]::Bold)
  $detailFont = New-Object Drawing.Font("Segoe UI", 14)
  $g.DrawString($label, $labelFont, (New-Object Drawing.SolidBrush($ink)), $x + 22, $y + 22)
  $g.DrawString($detail, $detailFont, (New-Object Drawing.SolidBrush($muted)), $x + 22, $y + 68)
}

function Draw-Arrow($g, $x1, $y1, $x2, $y2, $color) {
  $pen = New-Object Drawing.Pen($color, 5)
  $pen.EndCap = [Drawing.Drawing2D.LineCap]::Triangle
  $g.DrawLine($pen, $x1, $y1, $x2, $y2)
}

function Save-Canvas($canvas) {
  $canvas.Bitmap.Save($canvas.File, [Drawing.Imaging.ImageFormat]::Png)
  $canvas.Graphics.Dispose()
  $canvas.Bitmap.Dispose()
}

$canvas = New-Canvas "react-render-pipeline.png" "React render pipeline" "An update is calculated first, then committed to the browser DOM."
$g = $canvas.Graphics
Draw-Box $g 70 260 250 150 "1  Update" "click, props, or state" $orangeLight $orange
Draw-Box $g 420 260 250 150 "2  Render" "call components" $blueLight $blue
Draw-Box $g 770 260 250 150 "3  Reconcile" "compare Fibers" $tealLight $teal
Draw-Box $g 1120 260 330 150 "4  Commit" "mutate DOM, run effects" $greenLight $green
Draw-Arrow $g 320 335 420 335 $muted
Draw-Arrow $g 670 335 770 335 $muted
Draw-Arrow $g 1020 335 1120 335 $muted
$g.DrawString("React element descriptions", (New-Object Drawing.Font("Segoe UI", 16)), (New-Object Drawing.SolidBrush($blue)), 465, 450)
$g.DrawString("Fiber work tree", (New-Object Drawing.Font("Segoe UI", 16)), (New-Object Drawing.SolidBrush($teal)), 825, 450)
$g.DrawString("real DOM + browser paint", (New-Object Drawing.Font("Segoe UI", 16)), (New-Object Drawing.SolidBrush($green)), 1150, 450)
$g.DrawString("Render can be interrupted or discarded. Commit is synchronized so the browser never sees a half-finished tree.", (New-Object Drawing.Font("Segoe UI", 18)), (New-Object Drawing.SolidBrush($ink)), 190, 650)
Save-Canvas $canvas

$canvas = New-Canvas "react-fiber-tree.png" "Fiber tree walkthrough" "Fibers are linked units of work with parent, child, sibling, and alternate relationships."
$g = $canvas.Graphics
Draw-Box $g 625 190 350 110 "HostRoot" "#root container" $orangeLight $orange
Draw-Box $g 625 390 350 110 "App" "function component" $blueLight $blue
Draw-Box $g 250 610 270 100 "header" "host element" $tealLight $teal
Draw-Box $g 665 610 270 100 "main" "host element" $tealLight $teal
Draw-Box $g 1080 610 270 100 "footer" "host element" $tealLight $teal
Draw-Arrow $g 800 300 800 390 $muted
Draw-Arrow $g 800 500 385 610 $muted
Draw-Arrow $g 800 500 800 610 $muted
Draw-Arrow $g 800 500 1215 610 $muted
$g.DrawString("return", (New-Object Drawing.Font("Segoe UI", 15)), (New-Object Drawing.SolidBrush($muted)), 835, 535)
$g.DrawString("child", (New-Object Drawing.Font("Segoe UI", 15)), (New-Object Drawing.SolidBrush($muted)), 575, 575)
$g.DrawString("sibling", (New-Object Drawing.Font("Segoe UI", 15)), (New-Object Drawing.SolidBrush($muted)), 950, 655)
$g.DrawString("alternate ->", (New-Object Drawing.Font("Segoe UI", 16, [Drawing.FontStyle]::Bold)), (New-Object Drawing.SolidBrush($orange)), 1280, 180)
$g.DrawString("Fiber links: child + sibling", (New-Object Drawing.Font("Segoe UI", 18, [Drawing.FontStyle]::Bold)), (New-Object Drawing.SolidBrush($blue)), 280, 790)
$g.DrawString("alternate links to other tree", (New-Object Drawing.Font("Segoe UI", 18, [Drawing.FontStyle]::Bold)), (New-Object Drawing.SolidBrush($green)), 1080, 790)
Save-Canvas $canvas

$canvas = New-Canvas "react-diffing.png" "Reconciliation and diffing" "Stable types and keys preserve identity; changes become a small set of DOM mutations."
$g = $canvas.Graphics
$g.DrawString("Previous render", (New-Object Drawing.Font("Segoe UI", 21, [Drawing.FontStyle]::Bold)), (New-Object Drawing.SolidBrush($muted)), 160, 190)
$g.DrawString("Next render", (New-Object Drawing.Font("Segoe UI", 21, [Drawing.FontStyle]::Bold)), (New-Object Drawing.SolidBrush($muted)), 1060, 190)
Draw-Box $g 120 270 320 105 "li key=1" "Buy milk" $blueLight $blue
Draw-Box $g 120 430 320 105 "li key=2" "Read book" $blueLight $blue
Draw-Box $g 1060 270 320 105 "li key=2" "Read book" $greenLight $green
Draw-Box $g 1060 430 320 105 "li key=1" "Buy milk" $greenLight $green
Draw-Arrow $g 440 322 1060 480 $green
Draw-Arrow $g 440 482 1060 322 $green
$g.DrawString("same keys: preserve each row's Fiber and state", (New-Object Drawing.Font("Segoe UI", 18)), (New-Object Drawing.SolidBrush($green)), 500, 600)
Draw-Box $g 500 680 600 120 "Only order changed" "React can move/reuse existing DOM nodes" $orangeLight $orange
Save-Canvas $canvas

Write-Output "Created React architecture diagrams in $output"