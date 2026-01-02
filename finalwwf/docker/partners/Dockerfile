FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the Partners project into the image. When building, run from repository root so the build context
# includes the temp/partners folder created when you extracted the zip.
COPY ./temp/partners/Partners/Partners ./Partners
WORKDIR /src/Partners

RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish ./
EXPOSE 80
ENTRYPOINT ["dotnet", "Partners.dll"]
