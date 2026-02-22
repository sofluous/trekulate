param(
  [Parameter(Mandatory=$true)]
  [string]$Version,
  [switch]$UseCurrentAsSource
)

$root = Split-Path -Parent $PSScriptRoot
$trek = Join-Path $root '_TREKULATE'
$current = Join-Path $trek 'index.html'
$versioned = Join-Path $trek ("index_{0}.html" -f $Version)

if ($UseCurrentAsSource) {
  if (-not (Test-Path $current)) { throw "Missing current entrypoint: $current" }
  Copy-Item $current $versioned -Force
  Write-Host "Snapshot created: $versioned"
  exit 0
}

if (-not (Test-Path $versioned)) {
  throw "Missing versioned file: $versioned"
}

Copy-Item $versioned $current -Force
Write-Host "Published $versioned -> $current"
