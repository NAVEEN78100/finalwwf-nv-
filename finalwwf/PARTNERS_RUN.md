Running the Partners ASP.NET app
================================

This project (the Partners zip you uploaded) is an ASP.NET Core MVC app targeting .NET 8. To run it exactly as developed you must run the app with the .NET SDK installed.

Quick options
- Install .NET 8 SDK and run the app locally (recommended for exact behaviour).
- Build and run via Docker (if you have Docker installed) using the provided Dockerfile.

1) Install .NET 8 SDK
- Windows (winget):
  winget install --id Microsoft.DotNet.SDK.8 -e
- Or download: https://dotnet.microsoft.com/en-us/download/dotnet/8.0

2) Run with the helper script (from repository root)
PowerShell (regular or elevated):
```
# from repo root
.\scripts\run-partners.ps1
```

This script will:
- verify the project exists under `temp\partners\Partners\Partners`
- check for installed .NET SDKs
- set `ASPNETCORE_URLS` to `http://localhost:5005` and run `dotnet run`

3) Run directly (manual)
```
cd temp\partners\Partners\Partners
dotnet restore
# set the URL for the current PowerShell session:
$env:ASPNETCORE_URLS='http://localhost:5005'
dotnet run
```

4) Build & run via Docker (optional)
From repo root (requires Docker):
```
docker build -f docker/partners/Dockerfile -t partners-app .
docker run -p 5005:80 partners-app
```

When the app is running on `http://localhost:5005`, the Next app's Company -> Partners page will show it inside an iframe.

If you want, after you run it locally I can verify the iframe loads and fix any header/CORS/frame issues. If you prefer I can convert the crucial views into Next pages instead — say the word and I’ll estimate time.
