FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base

RUN apt-get update -y && apt-get install python3 -y && apt-get install python3-distutils -y

RUN curl -fsSL https://bootstrap.pypa.io/get-pip.py -o get-pip.py \
    && python3 get-pip.py \
    && python3 -m pip install --upgrade youtube-dl
WORKDIR /app

EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y \
        nodejs \
    && rm -rf /var/lib/apt/lists/*

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
