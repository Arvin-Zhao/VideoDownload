FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["VideoDownload.Web/VideoDownload.Web.csproj", "VideoDownload.Web/"]
RUN dotnet restore "VideoDownload.Web/VideoDownload.Web.csproj"
COPY . .
WORKDIR "/src/VideoDownload.Web"
RUN dotnet build "VideoDownload.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "VideoDownload.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "VideoDownload.Web.dll"]
